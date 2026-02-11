# USLEEP 后台系统实施计划

## Context

苏州姑苏优眠医学中心官网 (React 19 + Vite 7) 目前是纯前端项目，没有后端。网站上"立即预约"按钮均无功能。需要新增一个 Go Gin 后台来：
1. 收集用户预约信息（姓名、手机号、性别、年龄、预约科室、期望时间、症状简述）
2. 提供可配置的心理量表系统（管理员可创建量表，患者通过官网或独立链接填写）
3. 提供一个独立的 React 管理后台（Ant Design），查看预约、管理量表、查看结果

## 技术选型

| 组件 | 技术 |
|------|------|
| 后端 | Go Gin + GORM + SQLite |
| 管理后台 | React 19 + Vite + Ant Design |
| 认证 | 单管理员账号 + JWT |
| 配置 | config.yaml (Viper) |

## 目录结构

```
usleep/
├── src/                          # 现有官网前端
│   ├── components/
│   │   └── BookingModal.jsx      # 新增：预约弹窗
│   └── pages/
│       └── Questionnaire.jsx     # 新增：量表填写页
├── server/                       # 新增：Go 后端
│   ├── main.go
│   ├── config/
│   │   ├── config.go
│   │   └── config.yaml
│   ├── database/
│   │   ├── database.go           # SQLite + GORM 初始化
│   │   └── seed.go               # 初始化管理员账号
│   ├── models/
│   │   ├── admin.go
│   │   ├── appointment.go
│   │   ├── questionnaire.go
│   │   └── questionnaire_result.go
│   ├── handlers/
│   │   ├── auth.go
│   │   ├── appointment.go
│   │   ├── questionnaire.go
│   │   ├── questionnaire_public.go
│   │   ├── dashboard.go
│   │   └── export.go
│   ├── middleware/
│   │   ├── auth.go               # JWT 验证
│   │   └── cors.go
│   ├── routes/routes.go
│   └── utils/
│       ├── jwt.go
│       └── response.go
├── admin/                        # 新增：管理后台前端
│   ├── src/
│   │   ├── api/                  # Axios 封装
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Appointments.jsx
│   │   │   ├── Questionnaires.jsx
│   │   │   ├── QuestionnaireEdit.jsx
│   │   │   └── QuestionnaireResults.jsx
│   │   └── components/
│   │       ├── Layout.jsx
│   │       └── QuestionEditor.jsx
│   └── vite.config.js
```

## 数据库设计 (SQLite)

### appointments 表
| 字段 | 类型 | 说明 |
|------|------|------|
| id | INTEGER PK | 自增ID |
| name | TEXT | 姓名 |
| phone | TEXT | 手机号 |
| gender | TEXT | 性别 |
| age | INTEGER | 年龄 |
| department | TEXT | 预约科室 |
| preferred_time | TEXT | 期望时间 |
| symptoms | TEXT | 症状简述 |
| status | TEXT | pending/confirmed/completed/cancelled |
| admin_notes | TEXT | 管理员备注 |
| created_at, updated_at | DATETIME | 时间戳 |

### questionnaires 表
| 字段 | 类型 | 说明 |
|------|------|------|
| id | INTEGER PK | 自增ID |
| title | TEXT | 量表名称 |
| description | TEXT | 量表说明 |
| category | TEXT | 分类（睡眠/抑郁/焦虑等）|
| questions_json | TEXT | 题目配置 JSON |
| scoring_json | TEXT | 计分规则 JSON |
| share_code | TEXT UNIQUE | 分享短码 |
| is_active | INTEGER | 是否启用 |
| created_at, updated_at | DATETIME | 时间戳 |

### questionnaire_results 表
| 字段 | 类型 | 说明 |
|------|------|------|
| id | INTEGER PK | 自增ID |
| questionnaire_id | INTEGER FK | 关联量表 |
| questionnaire_title | TEXT | 冗余存储量表名 |
| patient_name | TEXT | 填写人姓名 |
| patient_phone | TEXT | 填写人手机 |
| patient_age | INTEGER | 年龄 |
| patient_gender | TEXT | 性别 |
| answers_json | TEXT | 作答详情 JSON |
| total_score | REAL | 总分 |
| result_text | TEXT | 结果解读文本 |
| created_at | DATETIME | 提交时间 |

## 量表 JSON 设计

### questions_json - 题目结构
```json
[
  {
    "id": "q1",
    "text": "您通常需要多长时间才能入睡？",
    "type": "single_choice",    // single_choice | multi_choice | rating
    "required": true,
    "options": [
      { "label": "15分钟以内", "value": "a", "score": 0 },
      { "label": "16-30分钟", "value": "b", "score": 1 },
      { "label": "31-60分钟", "value": "c", "score": 2 },
      { "label": "60分钟以上", "value": "d", "score": 3 }
    ]
  }
]
```

### scoring_json - 计分规则
```json
{
  "method": "sum",
  "ranges": [
    { "min": 0,  "max": 5,  "label": "睡眠质量良好" },
    { "min": 6,  "max": 10, "label": "轻度睡眠障碍" },
    { "min": 11, "max": 21, "label": "中度睡眠障碍" }
  ]
}
```

## API 设计

### 公开接口（无需认证）
| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/appointments` | 提交预约 |
| GET | `/api/questionnaires` | 获取启用的量表列表 |
| GET | `/api/questionnaires/:share_code` | 获取量表详情（用于填写）|
| POST | `/api/questionnaires/:share_code/submit` | 提交量表结果 |

### 认证接口
| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/auth/login` | 管理员登录，返回 JWT |

### 管理接口（需 JWT）
| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/admin/dashboard` | 仪表盘统计 |
| GET | `/api/admin/appointments` | 预约列表（分页、筛选）|
| PUT | `/api/admin/appointments/:id/status` | 更新预约状态 |
| PUT | `/api/admin/appointments/:id/notes` | 更新备注 |
| DELETE | `/api/admin/appointments/:id` | 删除预约 |
| GET/POST | `/api/admin/questionnaires` | 量表列表 / 创建 |
| GET/PUT/DELETE | `/api/admin/questionnaires/:id` | 量表详情 / 更新 / 删除 |
| GET | `/api/admin/results` | 量表结果列表 |
| GET | `/api/admin/results/:id` | 结果详情 |
| GET | `/api/admin/results/export` | 导出 CSV |

## 官网集成

需要修改的现有文件：
- `src/components/Header.jsx` - "立即预约" 按钮绑定打开 BookingModal
- `src/pages/Contact.jsx` - "在线预约" 按钮绑定打开 BookingModal
- `src/App.jsx` - 添加 `/questionnaire/:shareCode` 路由
- `vite.config.js` - 添加 `/api` 代理到 Go 后端

新增文件：
- `src/components/BookingModal.jsx` - 预约表单弹窗
- `src/pages/Questionnaire.jsx` - 公开量表填写页

## 实施步骤

### Phase 1: Go 后端基础
- 初始化 Go module，安装依赖（gin, gorm, jwt, viper, bcrypt）
- 搭建 config / database / middleware / routes 骨架
- 实现数据库自动迁移和管理员账号初始化

### Phase 2: 预约 API
- 实现预约的公开提交接口和管理端 CRUD
- 手机号验证、必填字段校验

### Phase 3: 认证
- 实现登录接口和 JWT 中间件
- 管理接口都走 JWT 验证

### Phase 4: 量表 API
- 管理端量表 CRUD（JSON 存储题目和计分规则）
- 公开端获取量表和提交结果
- 服务端计算得分和结果解读
- 仪表盘统计 + CSV 导出

### Phase 5: 管理后台前端 (admin/)
- 创建 Vite React 项目，安装 Ant Design
- 登录页 + JWT 管理
- 仪表盘、预约管理、量表管理、结果查看页面

### Phase 6: 官网集成
- 新增 BookingModal 组件，绑定所有预约按钮
- 新增量表填写页面
- 配置 Vite 代理

## 验证方式

1. 启动 Go 后端 (`cd server && go run main.go`)，确认监听 :8080
2. 用 curl 测试预约提交 API
3. 用 curl 测试登录获取 JWT，再测试管理接口
4. 启动管理后台 (`cd admin && npm run dev`)，测试完整管理流程
5. 启动官网 (`npm run dev`)，测试预约弹窗和量表填写
6. 端到端：官网提交预约 -> 管理后台查看；创建量表 -> 生成链接 -> 填写 -> 查看结果

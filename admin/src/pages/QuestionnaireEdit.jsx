import React, { useEffect, useState } from 'react'
import { Form, Input, Select, Button, Card, Space, Divider, message, InputNumber } from 'antd'
import { PlusOutlined, MinusCircleOutlined, CopyOutlined } from '@ant-design/icons'

import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { getQuestionnaire, createQuestionnaire, updateQuestionnaire } from '../api/questionnaires'

const categoryOptions = [
  { value: '睡眠', label: '睡眠' },
  { value: '抑郁', label: '抑郁' },
  { value: '焦虑', label: '焦虑' },
  { value: '心理', label: '心理综合' },
  { value: '其他', label: '其他' },
]

export default function QuestionnaireEdit() {
  const { id } = useParams()
  const isNew = id === 'new'

  const navigate = useNavigate()
  const location = useLocation()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!isNew) {
      setLoading(true)
      getQuestionnaire(id).then((res) => {
        const q = res.data
        let questions = []
        let scoring = { method: 'sum', ranges: [] }
        try { questions = JSON.parse(q.questions_json) } catch {}
        try { scoring = JSON.parse(q.scoring_json) } catch {}
        form.setFieldsValue({
          title: q.title,
          description: q.description,
          category: q.category,
          questions,
          scoring_ranges: scoring.ranges || [],
        })
        setLoading(false)
        setLoading(false)
      })
    } else if (location.state?.duplicateData) {
      // 处理复制逻辑
      const source = location.state.duplicateData
      let questions = []
      let scoring = { method: 'sum', ranges: [] }
      try { questions = JSON.parse(source.questions_json) } catch {}
      try { scoring = JSON.parse(source.scoring_json) } catch {}
      
      // 清除题目 ID，确保作为新题目创建
      questions = questions.map(q => {
        const { id, ...rest } = q;
        return rest;
      })

      form.setFieldsValue({
        title: `${source.title} (副本)`,
        description: source.description,
        category: source.category,
        questions,
        scoring_ranges: scoring.ranges || [],
      })
      message.info('已从副本加载数据，请根据需要修改后保存')
    }
  }, [id, location.state])

  const onFinish = async (values) => {
    setSaving(true)
    try {
      // 为每个题目自动生成 id
      const questions = (values.questions || []).map((q, idx) => ({
        ...q,
        id: `q${idx + 1}`,
        type: q.type || 'single_choice',
        required: true,
        options: (q.options || []).map((opt, oi) => ({
          ...opt,
          value: String.fromCharCode(97 + oi), // a, b, c, d...
        })),
      }))

      const scoring = {
        method: 'sum',
        ranges: values.scoring_ranges || [],
      }

      const payload = {
        title: values.title,
        description: values.description,
        category: values.category,
        questions_json: JSON.stringify(questions),
        scoring_json: JSON.stringify(scoring),
      }

      if (isNew) {
        await createQuestionnaire(payload)
        message.success('量表创建成功')
      } else {
        await updateQuestionnaire(id, payload)
        message.success('量表更新成功')
      }
      navigate('/questionnaires')
    } catch (err) {
      message.error('保存失败')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <h3>{isNew ? '新建量表' : '编辑量表'}</h3>
      <Form form={form} layout="vertical" onFinish={onFinish}
        initialValues={{ questions: [{ text: '', type: 'single_choice', options: [{ label: '', score: 0 }] }], scoring_ranges: [{ min: 0, max: 5, label: '' }] }}>

        <Card title="基本信息" style={{ marginBottom: 16 }}>
          <Form.Item name="title" label="量表名称" rules={[{ required: true, message: '请输入量表名称' }]}>
            <Input placeholder="如：匹兹堡睡眠质量指数(PSQI)" />
          </Form.Item>
          <Form.Item name="description" label="量表说明">
            <Input.TextArea rows={2} placeholder="简要描述量表用途" />
          </Form.Item>
          <Form.Item name="category" label="分类">
            <Select options={categoryOptions} placeholder="选择分类" />
          </Form.Item>
        </Card>

        <Card title="题目设置" style={{ marginBottom: 16 }}>
          <Form.List name="questions">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, qIdx) => (
                  <Card key={field.key} size="small"
                    title={`题目 ${qIdx + 1}`}
                    extra={fields.length > 1 && <MinusCircleOutlined onClick={() => remove(field.name)} />}
                    style={{ marginBottom: 12 }}>
                    <Form.Item {...field} name={[field.name, 'text']} label="题目内容"
                      rules={[{ required: true, message: '请输入题目' }]}>
                      <Input placeholder="请输入题目" />
                    </Form.Item>
                    <Form.Item {...field} name={[field.name, 'type']} label="题型" initialValue="single_choice">
                      <Select options={[
                        { value: 'single_choice', label: '单选' },
                        { value: 'multi_choice', label: '多选' },
                        { value: 'rating', label: '评分' },
                      ]} />
                    </Form.Item>

                    <Divider plain>选项</Divider>
                    <Form.List name={[field.name, 'options']}>
                      {(optFields, optOps) => (
                        <>
                          {optFields.map((optField, oIdx) => (
                            <Space key={optField.key} align="baseline" style={{ display: 'flex', marginBottom: 8 }}>
                              <Form.Item {...optField} name={[optField.name, 'label']}
                                rules={[{ required: true, message: '选项文本' }]} noStyle>
                                <Input placeholder={`选项 ${oIdx + 1}`} style={{ width: 200 }} />
                              </Form.Item>
                              <Form.Item {...optField} name={[optField.name, 'score']} noStyle>
                                <InputNumber placeholder="分值" min={0} style={{ width: 80 }} />
                              </Form.Item>
                              {optFields.length > 1 && <MinusCircleOutlined onClick={() => optOps.remove(optField.name)} />}
                            </Space>
                          ))}
                          <Button type="dashed" onClick={() => optOps.add({ label: '', score: 0 })} icon={<PlusOutlined />} size="small">
                            添加选项
                          </Button>
                        </>
                          )}
                        </Form.List>

                        {/* 复制选项功能 */}
                        <div style={{ marginTop: 8 }}>
                          <Select
                            placeholder="复制其他题目的选项"
                            style={{ width: 180 }}
                            onChange={(sourceQIdx) => {
                              // 获取源题目的当前值
                              const allQuestions = form.getFieldValue('questions')
                              const sourceOptions = allQuestions[sourceQIdx]?.options || []
                              
                              // 复制并覆盖当前题目的选项
                              const newOptions = sourceOptions.map(opt => ({ 
                                label: opt.label, 
                                score: opt.score 
                              }))
                              
                              // 更新表单
                              const currentQuestions = [...allQuestions]
                              currentQuestions[qIdx].options = newOptions
                              form.setFieldsValue({ questions: currentQuestions })
                              
                              message.success(`已复制题目 ${sourceQIdx + 1} 的选项`)
                            }}
                            dropdownMatchSelectWidth={false}
                          >
                            {/* 列出除了自己以外的所有题目 */}
                            {fields.map((f, i) => {
                              if (i === qIdx) return null // 不复制自己
                              const qValues = form.getFieldValue(['questions', i])
                              const qTitle = qValues?.text ? `${i + 1}. ${qValues.text.substring(0, 10)}...` : `题目 ${i + 1}`
                              return (
                                <Select.Option key={i} value={i}>
                                  {qTitle}
                                </Select.Option>
                              )
                            })}
                          </Select>
                        </div>
                      </Card>
                    ))}
                <Button type="dashed" onClick={() => add({ text: '', type: 'single_choice', options: [{ label: '', score: 0 }] })}
                  icon={<PlusOutlined />} block>
                  添加题目
                </Button>
              </>
            )}
          </Form.List>
        </Card>

        <Card title="计分规则" style={{ marginBottom: 16 }}>
          <Form.List name="scoring_ranges">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Space key={field.key} align="baseline" style={{ display: 'flex', marginBottom: 8 }}>
                    <Form.Item {...field} name={[field.name, 'min']} noStyle>
                      <InputNumber placeholder="最低分" min={0} style={{ width: 90 }} />
                    </Form.Item>
                    <span>~</span>
                    <Form.Item {...field} name={[field.name, 'max']} noStyle>
                      <InputNumber placeholder="最高分" min={0} style={{ width: 90 }} />
                    </Form.Item>
                    <Form.Item {...field} name={[field.name, 'label']}
                      rules={[{ required: true, message: '结果标签' }]} noStyle>
                      <Input placeholder="结果描述" style={{ width: 200 }} />
                    </Form.Item>
                    {fields.length > 1 && <MinusCircleOutlined onClick={() => remove(field.name)} />}
                  </Space>
                ))}
                <Button type="dashed" onClick={() => add({ min: 0, max: 0, label: '' })} icon={<PlusOutlined />} size="small">
                  添加区间
                </Button>
              </>
            )}
          </Form.List>
        </Card>

        <Space>
          <Button type="primary" htmlType="submit" loading={saving}>
            {isNew ? '创建量表' : '保存修改'}
          </Button>
          <Button onClick={() => navigate('/questionnaires')}>取消</Button>
        </Space>
      </Form>
    </div>
  )
}

import React from 'react'
import { Layout, Menu, Button, theme } from 'antd'
import {
  DashboardOutlined,
  CalendarOutlined,
  FileTextOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'

const { Header, Sider, Content } = Layout

const menuItems = [
  { key: '/', icon: <DashboardOutlined />, label: '仪表盘' },
  { key: '/appointments', icon: <CalendarOutlined />, label: '预约管理' },
  { key: '/questionnaires', icon: <FileTextOutlined />, label: '量表管理' },
  { key: '/results', icon: <BarChartOutlined />, label: '量表结果' },
]

export default function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken()
  const username = localStorage.getItem('username') || '管理员'

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    navigate('/login')
  }

  // 匹配当前菜单选中项
  const selectedKey = menuItems.find(
    (item) => item.key !== '/' && location.pathname.startsWith(item.key)
  )?.key || '/'

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="80"
        style={{ background: colorBgContainer }}
      >
        <div style={{
          height: 64, display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontWeight: 700, fontSize: 16,
          color: '#1677ff', borderBottom: '1px solid #f0f0f0',
        }}>
          优眠管理后台
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{ borderRight: 0 }}
        />
      </Sider>
      <Layout>
        <Header style={{
          padding: '0 24px', background: colorBgContainer,
          display: 'flex', justifyContent: 'flex-end', alignItems: 'center',
          borderBottom: '1px solid #f0f0f0',
        }}>
          <span style={{ marginRight: 16 }}>欢迎，{username}</span>
          <Button icon={<LogoutOutlined />} onClick={handleLogout}>
            退出登录
          </Button>
        </Header>
        <Content style={{
          margin: 24, padding: 24, minHeight: 280,
          background: colorBgContainer, borderRadius: borderRadiusLG,
        }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

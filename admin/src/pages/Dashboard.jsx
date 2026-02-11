import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Statistic, Table, Tag, Spin } from 'antd'
import {
  CalendarOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  BarChartOutlined,
  AlertOutlined,
} from '@ant-design/icons'
import { getDashboard } from '../api/dashboard'
import dayjs from 'dayjs'

const statusMap = {
  pending: { color: 'orange', text: '待处理' },
  confirmed: { color: 'blue', text: '已确认' },
  completed: { color: 'green', text: '已完成' },
  cancelled: { color: 'default', text: '已取消' },
}

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDashboard().then((res) => {
      setData(res.data)
      setLoading(false)
    })
  }, [])

  if (loading) return <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />

  const appointmentColumns = [
    { title: '姓名', dataIndex: 'name', width: 80 },
    { title: '手机号', dataIndex: 'phone', width: 130 },
    { title: '科室', dataIndex: 'department', width: 100 },
    {
      title: '状态', dataIndex: 'status', width: 80,
      render: (s) => <Tag color={statusMap[s]?.color}>{statusMap[s]?.text}</Tag>,
    },
    {
      title: '时间', dataIndex: 'created_at', width: 160,
      render: (t) => dayjs(t).format('MM-DD HH:mm'),
    },
  ]

  const resultColumns = [
    { title: '量表', dataIndex: 'questionnaire_title', width: 150 },
    { title: '姓名', dataIndex: 'patient_name', width: 80 },
    { title: '得分', dataIndex: 'total_score', width: 60 },
    { title: '结果', dataIndex: 'result_text', width: 120 },
    {
      title: '时间', dataIndex: 'created_at', width: 160,
      render: (t) => dayjs(t).format('MM-DD HH:mm'),
    },
  ]

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={12} sm={8} lg={4}>
          <Card>
            <Statistic title="总预约数" value={data.total_appointments}
              prefix={<CalendarOutlined />} />
          </Card>
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <Card>
            <Statistic title="待处理" value={data.pending_appointments}
              prefix={<AlertOutlined />} valueStyle={{ color: '#faad14' }} />
          </Card>
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <Card>
            <Statistic title="今日新增" value={data.today_appointments}
              prefix={<ClockCircleOutlined />} valueStyle={{ color: '#1677ff' }} />
          </Card>
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <Card>
            <Statistic title="量表数" value={data.total_questionnaires}
              prefix={<FileTextOutlined />} />
          </Card>
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <Card>
            <Statistic title="填写结果" value={data.total_results}
              prefix={<BarChartOutlined />} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col xs={24} lg={12}>
          <Card title="最近预约" size="small">
            <Table
              dataSource={data.recent_appointments}
              columns={appointmentColumns}
              rowKey="id"
              pagination={false}
              size="small"
              scroll={{ x: 500 }}
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="最近量表结果" size="small">
            <Table
              dataSource={data.recent_results}
              columns={resultColumns}
              rowKey="id"
              pagination={false}
              size="small"
              scroll={{ x: 500 }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

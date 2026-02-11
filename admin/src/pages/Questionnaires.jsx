import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Button, Tag, Space, Modal, message, Popconfirm, Empty } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, CopyOutlined, LinkOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { getQuestionnaires, deleteQuestionnaire, updateQuestionnaire } from '../api/questionnaires'

export default function Questionnaires() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await getQuestionnaires({ page: 1, size: 100 })
      setData(res.data || [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const handleToggleActive = async (item) => {
    await updateQuestionnaire(item.id, { is_active: !item.is_active })
    message.success(item.is_active ? '已停用' : '已启用')
    fetchData()
  }

  const handleDelete = async (id) => {
    await deleteQuestionnaire(id)
    message.success('删除成功')
    fetchData()
  }

  const copyShareLink = (shareCode) => {
    const link = `${window.location.origin}/questionnaire/${shareCode}`
    navigator.clipboard.writeText(link)
    message.success('分享链接已复制')
  }

  const categoryColors = {
    '睡眠': 'blue', '抑郁': 'purple', '焦虑': 'orange',
    '心理': 'cyan', '其他': 'default',
  }

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <h3 style={{ margin: 0 }}>量表管理</h3>
        <Button type="primary" icon={<PlusOutlined />}
          onClick={() => navigate('/questionnaires/new')}>
          新建量表
        </Button>
      </div>

      {data.length === 0 && !loading ? (
        <Empty description="暂无量表，点击上方按钮新建" />
      ) : (
        <Row gutter={[16, 16]}>
          {data.map((item) => (
            <Col xs={24} sm={12} lg={8} key={item.id}>
              <Card
                title={item.title}
                extra={<Tag color={item.is_active ? 'green' : 'default'}>
                  {item.is_active ? '启用' : '停用'}
                </Tag>}
                actions={[
                  <EditOutlined key="edit" onClick={() => navigate(`/questionnaires/${item.id}`)} />,
                  <CopyOutlined key="copy" onClick={() => copyShareLink(item.share_code)} />,
                  <Popconfirm title="确认删除？" key="delete" onConfirm={() => handleDelete(item.id)}>
                    <DeleteOutlined />
                  </Popconfirm>,
                ]}
              >
                <p style={{ color: '#666', marginBottom: 8 }}>{item.description || '暂无描述'}</p>
                <Space>
                  {item.category && <Tag color={categoryColors[item.category] || 'default'}>{item.category}</Tag>}
                  <Tag icon={<LinkOutlined />} color="processing">
                    {item.share_code}
                  </Tag>
                </Space>
                <div style={{ marginTop: 12 }}>
                  <Button size="small" onClick={() => handleToggleActive(item)}>
                    {item.is_active ? '停用' : '启用'}
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}

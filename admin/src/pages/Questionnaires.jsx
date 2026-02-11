import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Button, Tag, Space, Modal, message, Popconfirm, Empty, Typography } from 'antd'
const { Paragraph } = Typography
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

  // 获取主站的基础URL (开发环境通过 .env 配置，生产环境默认为当前域名)
  const mainSiteUrl = import.meta.env.VITE_MAIN_SITE_URL || window.location.origin


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
          {data.map((item) => {
            const shareLink = `${mainSiteUrl}/questionnaire/${item.share_code}`
            return (
              <Col xs={24} sm={12} lg={8} key={item.id}>
                <Card
                  title={item.title}
                  extra={<Tag color={item.is_active ? 'green' : 'default'}>
                    {item.is_active ? '启用' : '停用'}
                  </Tag>}
                  actions={[
                    <EditOutlined key="edit" onClick={() => navigate(`/questionnaires/${item.id}`)} />,
                    <Popconfirm title="确认删除？" key="delete" onConfirm={() => handleDelete(item.id)}>
                      <DeleteOutlined />
                    </Popconfirm>,
                  ]}
                >
                  <p style={{ color: '#666', marginBottom: 8 }}>{item.description || '暂无描述'}</p>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Space>
                      {item.category && <Tag color={categoryColors[item.category] || 'default'}>{item.category}</Tag>}
                      <Tag icon={<LinkOutlined />} color="processing">
                        {item.share_code}
                      </Tag>
                    </Space>
                    
                    <div style={{ marginTop: 8, padding: 8, background: '#f5f5f5', borderRadius: 4 }}>
                      <div style={{ fontSize: 12, color: '#999', marginBottom: 4 }}>分享链接:</div>
                      <Paragraph copyable={{ text: shareLink }} style={{ marginBottom: 0, fontSize: 13, wordBreak: 'break-all' }}>
                        {shareLink}
                      </Paragraph>
                    </div>

                    <div style={{ marginTop: 4 }}>
                      <Button size="small" onClick={() => handleToggleActive(item)}>
                        {item.is_active ? '停用' : '启用'}
                      </Button>
                    </div>
                  </Space>
                </Card>
              </Col>
            )
          })}
        </Row>
      )}
    </div>
  )
}

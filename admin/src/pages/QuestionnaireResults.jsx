import React, { useEffect, useState } from 'react'
import { Table, Select, Button, Modal, Descriptions, Space, message } from 'antd'
import { DownloadOutlined, EyeOutlined } from '@ant-design/icons'
import { getResults, getResult, exportResults } from '../api/results'
import { getQuestionnaires } from '../api/questionnaires'
import dayjs from 'dayjs'

export default function QuestionnaireResults() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [questionnaireId, setQuestionnaireId] = useState('')
  const [questionnaires, setQuestionnaires] = useState([])
  const [detailModal, setDetailModal] = useState({ open: false, data: null })

  useEffect(() => {
    getQuestionnaires({ page: 1, size: 100 }).then((res) => {
      setQuestionnaires(res.data || [])
    })
  }, [])

  const fetchData = async (p = page) => {
    setLoading(true)
    try {
      const params = { page: p, size: 20 }
      if (questionnaireId) params.questionnaire_id = questionnaireId
      const res = await getResults(params)
      setData(res.data || [])
      setTotal(res.total)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData(1); setPage(1) }, [questionnaireId])

  const showDetail = async (id) => {
    const res = await getResult(id)
    setDetailModal({ open: true, data: res.data })
  }

  const handleExport = () => {
    const params = {}
    if (questionnaireId) params.questionnaire_id = questionnaireId
    exportResults(params)
    message.success('正在导出 CSV...')
  }

  const columns = [
    { title: '量表', dataIndex: 'questionnaire_title', width: 150 },
    { title: '姓名', dataIndex: 'patient_name', width: 80 },
    { title: '手机号', dataIndex: 'patient_phone', width: 130 },
    { title: '年龄', dataIndex: 'patient_age', width: 60 },
    { title: '性别', dataIndex: 'patient_gender', width: 60 },
    { title: '得分', dataIndex: 'total_score', width: 70, render: (v) => <strong>{v}</strong> },
    { title: '结果', dataIndex: 'result_text', width: 120 },
    {
      title: '提交时间', dataIndex: 'created_at', width: 160,
      render: (t) => dayjs(t).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: '操作', width: 80, fixed: 'right',
      render: (_, record) => (
        <Button size="small" icon={<EyeOutlined />} onClick={() => showDetail(record.id)}>
          详情
        </Button>
      ),
    },
  ]

  // 解析作答详情
  const renderAnswers = (answersJson) => {
    try {
      const answers = JSON.parse(answersJson)
      return answers.map((a, i) => (
        <div key={i} style={{ marginBottom: 4 }}>
          <strong>{a.question_id}:</strong> {a.values?.join(', ')}
        </div>
      ))
    } catch {
      return answersJson
    }
  }

  return (
    <div>
      <Space style={{ marginBottom: 16 }} wrap>
        <Select
          style={{ width: 250 }}
          value={questionnaireId}
          onChange={setQuestionnaireId}
          placeholder="按量表筛选"
          allowClear
          options={[
            { value: '', label: '全部量表' },
            ...questionnaires.map((q) => ({ value: String(q.id), label: q.title })),
          ]}
        />
        <Button icon={<DownloadOutlined />} onClick={handleExport}>
          导出 CSV
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        scroll={{ x: 900 }}
        pagination={{
          current: page, total, pageSize: 20,
          onChange: (p) => { setPage(p); fetchData(p) },
          showTotal: (t) => `共 ${t} 条`,
        }}
      />

      <Modal
        title="结果详情"
        open={detailModal.open}
        onCancel={() => setDetailModal({ open: false, data: null })}
        footer={null}
        width={600}
      >
        {detailModal.data && (
          <Descriptions bordered column={2} size="small">
            <Descriptions.Item label="量表">{detailModal.data.questionnaire_title}</Descriptions.Item>
            <Descriptions.Item label="姓名">{detailModal.data.patient_name}</Descriptions.Item>
            <Descriptions.Item label="手机号">{detailModal.data.patient_phone}</Descriptions.Item>
            <Descriptions.Item label="年龄">{detailModal.data.patient_age}</Descriptions.Item>
            <Descriptions.Item label="性别">{detailModal.data.patient_gender}</Descriptions.Item>
            <Descriptions.Item label="总分">
              <strong style={{ fontSize: 18, color: '#1677ff' }}>{detailModal.data.total_score}</strong>
            </Descriptions.Item>
            <Descriptions.Item label="结果" span={2}>
              <strong>{detailModal.data.result_text}</strong>
            </Descriptions.Item>
            <Descriptions.Item label="提交时间" span={2}>
              {dayjs(detailModal.data.created_at).format('YYYY-MM-DD HH:mm:ss')}
            </Descriptions.Item>
            <Descriptions.Item label="作答详情" span={2}>
              {renderAnswers(detailModal.data.answers_json)}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  )
}

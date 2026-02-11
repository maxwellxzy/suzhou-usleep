import React, { useEffect, useState } from 'react'
import { Table, Tag, Button, Input, Select, Space, Modal, message, Popconfirm } from 'antd'
import { SearchOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { getAppointments, updateAppointmentStatus, updateAppointmentNotes, deleteAppointment } from '../api/appointments'
import dayjs from 'dayjs'

const statusMap = {
  pending: { color: 'orange', text: '待处理' },
  confirmed: { color: 'blue', text: '已确认' },
  completed: { color: 'green', text: '已完成' },
  cancelled: { color: 'default', text: '已取消' },
}

const statusOptions = [
  { value: '', label: '全部状态' },
  { value: 'pending', label: '待处理' },
  { value: 'confirmed', label: '已确认' },
  { value: 'completed', label: '已完成' },
  { value: 'cancelled', label: '已取消' },
]

export default function Appointments() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState('')
  const [keyword, setKeyword] = useState('')
  const [notesModal, setNotesModal] = useState({ open: false, id: null, notes: '' })

  const fetchData = async (p = page) => {
    setLoading(true)
    try {
      const res = await getAppointments({ page: p, size: 20, status, keyword })
      setData(res.data || [])
      setTotal(res.total)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData(1); setPage(1) }, [status, keyword])

  const handleStatusChange = async (id, newStatus) => {
    await updateAppointmentStatus(id, newStatus)
    message.success('状态更新成功')
    fetchData()
  }

  const handleDelete = async (id) => {
    await deleteAppointment(id)
    message.success('删除成功')
    fetchData()
  }

  const handleNotesOk = async () => {
    await updateAppointmentNotes(notesModal.id, notesModal.notes)
    message.success('备注更新成功')
    setNotesModal({ open: false, id: null, notes: '' })
    fetchData()
  }

  const columns = [
    { title: '姓名', dataIndex: 'name', width: 80 },
    { title: '手机号', dataIndex: 'phone', width: 130 },
    { title: '性别', dataIndex: 'gender', width: 60 },
    { title: '年龄', dataIndex: 'age', width: 60 },
    { title: '科室', dataIndex: 'department', width: 100 },
    { title: '期望时间', dataIndex: 'preferred_time', width: 120 },
    { title: '症状', dataIndex: 'symptoms', width: 150, ellipsis: true },
    {
      title: '状态', dataIndex: 'status', width: 100,
      render: (s, record) => (
        <Select
          size="small"
          value={s}
          style={{ width: 90 }}
          onChange={(v) => handleStatusChange(record.id, v)}
          options={statusOptions.filter((o) => o.value)}
        />
      ),
    },
    { title: '备注', dataIndex: 'admin_notes', width: 120, ellipsis: true },
    {
      title: '提交时间', dataIndex: 'created_at', width: 160,
      render: (t) => dayjs(t).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: '操作', width: 100, fixed: 'right',
      render: (_, record) => (
        <Space>
          <Button size="small" icon={<EditOutlined />}
            onClick={() => setNotesModal({ open: true, id: record.id, notes: record.admin_notes || '' })}
          />
          <Popconfirm title="确认删除？" onConfirm={() => handleDelete(record.id)}>
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <Space style={{ marginBottom: 16 }} wrap>
        <Select
          style={{ width: 130 }}
          value={status}
          onChange={setStatus}
          options={statusOptions}
        />
        <Input.Search
          placeholder="搜索姓名或手机号"
          allowClear
          onSearch={setKeyword}
          style={{ width: 250 }}
          prefix={<SearchOutlined />}
        />
      </Space>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        scroll={{ x: 1200 }}
        pagination={{
          current: page, total, pageSize: 20,
          onChange: (p) => { setPage(p); fetchData(p) },
          showTotal: (t) => `共 ${t} 条`,
        }}
      />

      <Modal
        title="编辑备注"
        open={notesModal.open}
        onOk={handleNotesOk}
        onCancel={() => setNotesModal({ open: false, id: null, notes: '' })}
      >
        <Input.TextArea
          rows={4}
          value={notesModal.notes}
          onChange={(e) => setNotesModal({ ...notesModal, notes: e.target.value })}
          placeholder="请输入管理员备注..."
        />
      </Modal>
    </div>
  )
}

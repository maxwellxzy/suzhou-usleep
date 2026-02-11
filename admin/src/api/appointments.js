import api from './index'

export const getAppointments = (params) =>
  api.get('/admin/appointments', { params })

export const updateAppointmentStatus = (id, status) =>
  api.put(`/admin/appointments/${id}/status`, { status })

export const updateAppointmentNotes = (id, admin_notes) =>
  api.put(`/admin/appointments/${id}/notes`, { admin_notes })

export const deleteAppointment = (id) =>
  api.delete(`/admin/appointments/${id}`)

export const exportAppointments = (params) => {
  const query = new URLSearchParams(params).toString()
  const token = localStorage.getItem('token')
  window.open(`/api/admin/appointments/export?${query}&token=${token}`, '_blank')
}

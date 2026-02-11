import api from './index'

export const getResults = (params) =>
  api.get('/admin/results', { params })

export const getResult = (id) =>
  api.get(`/admin/results/${id}`)

export const exportResults = (params) => {
  const query = new URLSearchParams(params).toString()
  window.open(`/api/admin/results/export?${query}`, '_blank')
}

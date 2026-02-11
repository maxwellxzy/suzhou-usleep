import api from './index'

export const getQuestionnaires = (params) =>
  api.get('/admin/questionnaires', { params })

export const getQuestionnaire = (id) =>
  api.get(`/admin/questionnaires/${id}`)

export const createQuestionnaire = (data) =>
  api.post('/admin/questionnaires', data)

export const updateQuestionnaire = (id, data) =>
  api.put(`/admin/questionnaires/${id}`, data)

export const deleteQuestionnaire = (id) =>
  api.delete(`/admin/questionnaires/${id}`)

import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from './components/AdminLayout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Appointments from './pages/Appointments'
import Questionnaires from './pages/Questionnaires'
import QuestionnaireEdit from './pages/QuestionnaireEdit'
import QuestionnaireResults from './pages/QuestionnaireResults'

// 路由守卫：检查 JWT
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token')
  if (!token) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <ProtectedRoute><AdminLayout /></ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="questionnaires" element={<Questionnaires />} />
          <Route path="questionnaires/:id" element={<QuestionnaireEdit />} />
          <Route path="results" element={<QuestionnaireResults />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

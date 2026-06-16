import './App.css'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { Home } from './components/Home'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import { AuthRoute } from './context/AuthContext'

function App() {
  const location = useLocation();
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/signup';

  if(isAuthRoute) {
    return (
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    )
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<AuthRoute><Home /></AuthRoute>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  )
}

export default App

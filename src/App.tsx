import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Devis from './pages/Devis'
import Admin from './pages/Admin'
import PizzeriaDemo from './pages/PizzeriaDemo'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/devis" element={<Devis />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/pizzeria" element={<PizzeriaDemo />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

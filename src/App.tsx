import { Routes, Route } from 'react-router'
import PizzaHome from './pages/PizzaHome'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PizzaHome />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

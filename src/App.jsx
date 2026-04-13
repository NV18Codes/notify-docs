import { Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Home from './pages/Home'
import Docs from './pages/Docs'
import FeaturePage from './pages/FeaturePage'
import { Chatbot } from './components/Chatbot'

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<Navigate to="/docs/getting-started" replace />} />
        <Route path="/docs/*" element={<Docs />} />
        <Route path="/features/:slug" element={<FeaturePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Chatbot />
    </ThemeProvider>
  )
}

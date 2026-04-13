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
        <Route path="/docs" element={<Navigate to="/docs/introduction" replace />} />
        <Route path="/docs/getting-started" element={<Navigate to="/docs/introduction" replace />} />
        <Route path="/docs/what-is-notifyy" element={<Navigate to="/docs/introduction" replace />} />
        <Route path="/docs/guides/whatsapp-campaigns" element={<Navigate to="/docs/send-first-campaign" replace />} />
        <Route path="/docs/guides/api-integration" element={<Navigate to="/docs/api-overview" replace />} />
        <Route path="/docs/guides/chatbot-setup" element={<Navigate to="/docs/features/chatbot-builder" replace />} />
        <Route path="/docs/features/whatsapp-business-api" element={<Navigate to="/docs/setup-whatsapp-api" replace />} />
        <Route path="/docs/features/qr-interactive" element={<Navigate to="/docs/integrations" replace />} />
        <Route path="/docs/faq" element={<Navigate to="/docs/introduction" replace />} />
        <Route path="/docs/*" element={<Docs />} />
        <Route path="/features/:slug" element={<FeaturePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Chatbot />
    </ThemeProvider>
  )
}

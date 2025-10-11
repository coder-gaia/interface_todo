import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GlobalStyle } from './styles/global.ts'
import { AuthProvider } from './contexts/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
<StrictMode>
    <GlobalStyle />
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
)

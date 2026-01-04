import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const allowedPaths = new Set(['/', '/index.html'])

if (!allowedPaths.has(window.location.pathname)) {
  window.location.replace('/404.html')
} else {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

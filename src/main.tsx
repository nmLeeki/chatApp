import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import App from '@/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

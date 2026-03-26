import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppSelector from './AppSelector'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppSelector />
  </StrictMode>,
)

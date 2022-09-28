import liff from '@line/liff'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './main.css'
import App from './App'

liff
  .init({ liffId: import.meta.env.VITE_LIFF_ID || '' })
  .then(() => {
    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    )
  })
  .catch((e) => {
    alert(`LIFF error: ${e.message}`)
  })

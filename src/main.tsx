import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

console.log('🚀 アプリケーション開始')
console.log('Environment:', (import.meta as any).env?.MODE || 'unknown')
console.log('Base URL:', (import.meta as any).env?.BASE_URL || '/')

// ルート要素の確認
const rootElement = document.getElementById('root')
console.log('Root element:', rootElement)

if (!rootElement) {
  console.error('❌ Root element not found!')
  document.body.innerHTML = '<div style="padding: 20px; color: red; font-size: 24px;">Error: Root element not found!</div>'
} else {
  console.log('✅ Root element found, rendering app...')
  
  try {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>,
    )
    console.log('✅ App rendered successfully')
  } catch (error) {
    console.error('❌ React render error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    rootElement.innerHTML = `<div style="padding: 20px; color: red; font-size: 24px;">Error: ${errorMessage}</div>`
  }
}

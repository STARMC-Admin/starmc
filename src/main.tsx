import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { StarMcProvider } from './context/StarMcContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StarMcProvider>
      <App />
    </StarMcProvider>
  </React.StrictMode>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import StockInterface from './components/StockInterface'

const App: React.FC = () => {
  return (
    <div>
      <StockInterface />
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
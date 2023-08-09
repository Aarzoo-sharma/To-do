import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AppContext } from './Context/Context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <div>
    <AppContext>
      <App />
    </AppContext>
  </div>
)

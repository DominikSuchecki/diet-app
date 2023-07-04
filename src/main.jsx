import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("../serviceWorker.js");
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
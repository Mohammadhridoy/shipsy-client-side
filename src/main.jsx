import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Myroutes from './Routes/Myroutes'
import AuthProvider from './pages/AuthProvider/AuthProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <AuthProvider>
  <RouterProvider router={Myroutes}>
    
    </RouterProvider>

  </AuthProvider>
  </React.StrictMode>,
)

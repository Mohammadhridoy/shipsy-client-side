import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Myroutes from './Routes/Myroutes'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={Myroutes}>
    
   </RouterProvider>
  </React.StrictMode>,
)

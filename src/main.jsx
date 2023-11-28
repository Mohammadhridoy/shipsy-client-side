import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Myroutes from './Routes/Myroutes'
import AuthProvider from './pages/AuthProvider/AuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <AuthProvider>
  <QueryClientProvider client={queryClient}>
  <RouterProvider router={Myroutes}>
    
    </RouterProvider>
    
     </QueryClientProvider>
  </AuthProvider>
  </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home, Login, Register } from '@/components/pages';
import './index.css'
import { UserProvider } from './context/user';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="hero min-h-screen bg-base-200">
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </div>
  </React.StrictMode>,
)

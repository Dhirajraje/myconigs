import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/login';
import HomeWrap from './pages/home';


const router = createBrowserRouter([
      {
        path:"",
        element:<Navigate to='login' />
        
      },
      {
        path:'login',
        element:<Login />
      },
      {
        path:'home',
        element:<HomeWrap />
      }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <Login /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/login';


const router = createBrowserRouter([
  {
    path: "",
    // element: <Navigate to='/login' />,
    children:[
      {
        path:'login',
        element:<Login />
      }
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <Login /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)

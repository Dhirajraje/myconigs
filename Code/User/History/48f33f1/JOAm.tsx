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
        element:<HomeWrap />,
        children:[
          {
            path:'',
            element:<Navigate to='calculation' />
          },
          {
            path:'calculation',
            element:<Calculations />
          },
          {
            path:'base-price-config',
            element:<div/>
          },
          {
            path:'additional-price-configs',
            element:<div/>
          },
          {
            path:'time-multiplier-configs',
            element:<div/>
          },
          {
            path:'waiting-charge-configs',
            element:<div/>
          }
        ]
      }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <Login /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)

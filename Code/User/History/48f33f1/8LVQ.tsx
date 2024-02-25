import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/login';
import HomeWrap from './pages/home';
import Calculation from './pages/home/calculation';
import BasePriceConfig from './pages/home/base-price-config';
import AdditonalPriceConfig from './pages/home/additional-price-config';
import TimeMultiplierConfig from './pages/home/time-multiplier-config';
import WaitingChargeConfig from './pages/home/waiting-charge-config';


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
            element:<Calculation />
          },
          {
            path:'base-price-config',
            element:<BasePriceConfig />
          },
          {
            path:'additional-price-configs',
            element:<AdditonalPriceConfig />
          },
          {
            path:'time-multiplier-configs',
            element:<TimeMultiplierConfig/>
          },
          {
            path:'waiting-charge-configs',
            element:<WaitingChargeConfig/>
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
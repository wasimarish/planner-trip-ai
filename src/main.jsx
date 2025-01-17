import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router'
import Index from './Create-trip/Index.jsx'
import Header from './Components/Custom/Header'
import { Toaster } from './Components/ui/sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Viewtrip from './Viewtrip/[tripId]/Index'
import MyTrips from './My-trips'

const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'create-trip',
    element:<Index/>
  },
  {
    path:'view-trip/:tripId',
    element:<Viewtrip/>
  },
  {
    path:'/my-trips',
    element:<MyTrips/>
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <Header/>
    <Toaster />
    <RouterProvider router={router}/>
    </GoogleOAuthProvider>
  </StrictMode>
  
)

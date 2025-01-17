import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router'
import Index from './create-trip/index.jsx'  // Changed Index.jsx to index.jsx
import Header from './components/custom/Header.jsx'
import { Toaster } from './components/ui/sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Viewtrip from './view-trip/[tripId]/index.jsx'  // Changed Index.jsx to index.jsx
import MyTrips from './my-trips/index.jsx'  // Changed Index.jsx to index.jsx

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

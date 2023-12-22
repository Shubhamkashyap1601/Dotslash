import React from 'react'
import ReactDOM from 'react-dom/client'
import {LoginPage, SignUp} from './components/index.js'
import Layout from './Layout.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='login' element={<LoginPage />} />
      <Route path='signup' element={<SignUp />} />
    </Route>  
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)

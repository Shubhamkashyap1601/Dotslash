import React from 'react'
import ReactDOM from 'react-dom/client'
import {LoginPage, SignUp, Home, CreateBlog, BlogMainPage} from './components/index.js'
import Layout from './Layout.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Rating from './components/Rating/Rating.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home pageText='Home' />} />
      <Route path='announcements' element={<Home pageText='Announcements' />} />
      <Route path='resources' element={<Home pageText='Resoruces' />} />
      <Route path='mentors' element={<Home pageText='Mentors' />} />
      <Route path='ratings' element={<Rating />} />
      <Route path='discussions' element={<Home pageText='Discussions' />} />
      <Route path='blogs' element={<BlogMainPage pageText='Blogs' />} />
      <Route path='login' element={<LoginPage />} />
      <Route path='signup' element={<SignUp />} />
      <Route path='blogs/create-blog' element={<CreateBlog />} />
    </Route>  
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
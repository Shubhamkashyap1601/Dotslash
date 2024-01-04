import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { LoginPage, SignUp, Home, CreateBlog, BlogMainPage, Chat } from './components/index.js'
import Layout from './Layout.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Rating from './components/Rating/Rating.jsx'
import SingleBlog from './components/Blogs/SingleBlog.jsx'
import User from './components/User/user.jsx'
import { LoginContextProvider } from './context/LoginContext.js'
import { response } from 'express'


const router = createBrowserRouter(

  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home pageText='Home' />} />
      <Route path='announcements' element={<Home pageText='Announcements' />} />
      <Route path='resources' element={<Home pageText='Resoruces' />} />
      <Route path='mentors' element={<Home pageText='Mentors' />} />
      <Route path='ratings' element={<Rating />} />
      <Route path='discussions' element={<Chat pageText='Discussions' />} />
      <Route path='blogs' element={<BlogMainPage pageText='Blogs' />} />
      <Route path='login' element={<LoginPage />} />
      <Route path='signup' element={<SignUp />} />
      <Route path='blogs/create-blog' element={<CreateBlog />} />
      <Route path='blog/:blogId' element={<SingleBlog />} />
      <Route path='user/:username' element={<User pageText='Home' />} />
    </Route>
  )
)

const [isLoggedIn, setIsUserLogged] = useState(() => {
  return ((JSON.parse(localStorage.getItem('isLoggedIn'))) || false);
});
const [username, setUsername] = useState(() => {
  return ((JSON.parse(localStorage.getItem('username'))) || "guest");
});

const LogIn = (name) => {
  setIsUserLogged(true);
}
const LogOut = () => {
  setIsUserLogged(false);
  setUsername("guest");
}

let data = null;
const isAuthorized = async() => {
  fetch('/api/authorized', 
    {
      method: 'GET',
    }
  )
  .then(async(response) => {
    if(response.ok){
      data = await response.json();
      LogIn();
      setUsername(data.data);
    } 
    else {
      LogOut();
    }
  })
}

useEffect(
  () => {
    isAuthorized();
  }
, [])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoginContextProvider value={{ isLoggedIn, LogIn, LogOut, username, setUsername }} >
      <RouterProvider router={router} />
    </LoginContextProvider>
  </React.StrictMode>,
)
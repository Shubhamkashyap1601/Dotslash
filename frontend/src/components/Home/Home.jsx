import React from 'react'
import { Blogs } from '../index.js'
import HomeRating from '../Rating/HomeRating.jsx'
import './Home.css'

function Home() {

  return (
    <>
      <HomeRating />
      <Blogs />
    </>
  )
}

export default Home
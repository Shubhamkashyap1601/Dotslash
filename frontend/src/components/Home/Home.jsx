import React from 'react'
import HomeBlogCard from '../Blogs/HomeBlogCard'

function Home({pageText}) {
  const blog = {
    title: 'New line character input in C',
    description: 'One should take care of inputting newlines while working in C',
    image: './src/assets/dotslashLogo.png',
    date: '23/12/23',
    likes: 1000,
    author: 'Daulat Ojha'
  }
  
  return (
    <>
        {/* <h1 className="timepass">This is {pageText}</h1> */}
        <HomeBlogCard blog={blog}/>
    </>
  )
}

export default Home
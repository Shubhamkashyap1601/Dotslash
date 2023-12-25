import React from 'react'
import HomeBlogCard from '../Blogs/HomeBlogCard'
import HomeRatingCard from '../Rating/HomeRatingCard'

function Home({ pageText }) {
  const blog = {
    title: 'New line character input in C',
    description: 'One should take care of inputting newlines while working in C',
    image: './src/assets/dotslashLogo.png',
    date: '23/12/23',
    likes: 1000,
    author: 'Daulat Ojha'
  }

  const users = [
    { name: 'Mudit Loya', rating: 1529 },
    { name: 'Vasu Kapasiya', rating: 1530 },
    { name: 'Daulat Ojha', rating: 1531 },
    { name: 'Shubham Kashyap', rating: 1532 },
    { name: 'Hamesh Puniya', rating: 1533 }
  ]

  const ratingCard = {
    logo: 'codeforces.png',
    platform: 'Codeforces',
    users: users
  }

  return (
    <>
      {/* <h1 className="timepass">This is {pageText}</h1> */}
      {/* <HomeBlogCard blog={blog} /> */}
      <HomeRatingCard ratingCard={ratingCard} />
    </>
  )
}

export default Home
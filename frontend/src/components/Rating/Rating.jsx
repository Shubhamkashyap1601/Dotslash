import React from 'react'
import RatingTable from './RatingTable'

function Rating(){
  const users = [
    {
      rank: '1',
      name: 'binomanjesh',
      rating: 1918
    },
    {
      rank: '2',
      name: 'jmichael',
      rating: 1741
    },
    {
      rank: '3',
      name: 'vijay_panwar12',
      rating: 1686
    },
    {
      rank: '4',
      name: 'vinay_panwar',
      rating: 1651
    },
    {
      rank: '5',
      name: 'vasu52',
      rating: 1621
    },
  ]
    return(
    <>
        <RatingTable platform = "CodeForces" platform_img = "../../src/assets/cf_img.webp" users = {users}/>
        <br />
        <br />
        <RatingTable platform = "LeetCode" platform_img = "../../src/assets/leetcode_img.png" users = {users}/>
        <br />
        <br />
        <RatingTable platform = "CodeChef" platform_img = "../../src/assets/codechef_img.jpg" users = {users}/>  
        <br />
        <br />
    </>
    ) 

}

export default Rating 
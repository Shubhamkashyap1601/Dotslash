import React from 'react'
import HomeRatingCard from './HomeRatingCard'
import './Rating.css'
import cf from '../../assets/cf_img.webp'
import leetcode from '../../assets/leetcode_img.png'
import codechef from '../../assets/codechef_img.jpg'

function HomeRating() {

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
      ]

    return (
        <>
            <h3 className='ratings-text'>Ratings</h3>
            <div className='rating-cards'>
                <HomeRatingCard platform="CodeForces" platform_img={cf} users={users} />
                <HomeRatingCard platform="LeetCode" platform_img={leetcode} users={users} />
                <HomeRatingCard platform="CodeChef" platform_img={codechef} users={users} />
            </div>
        </>
    )
}

export default HomeRating
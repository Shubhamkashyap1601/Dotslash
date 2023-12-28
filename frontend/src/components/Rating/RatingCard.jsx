import React from 'react'
import './Rating.css'

function RatingCard({platform, platform_img, users}) {
  return (
    <>
        <div className='home-rating-card'>
          <div className='home-rating-card-header'>
            <img className='platform-img' src={platform_img} alt="platform-image" />  
            <p className="header-title">{platform}</p>
          </div>
          <div className='home-rating-card-body'>
            <table>
              <thead>
                <th className='heading-rank'>Rank</th>
                <th>Username</th>
                <th>Current Rating</th>
              </thead>
              <tbody>
            {   users.map((user) => {
                return (
                    <tr>
                      <td className='user-rank'>{user.rank}</td>
                      <td className='user-name'>{user.name}</td>
                      <td className='user-rating'>{user.rating}</td>
                    </tr>
                     )
              })
            }
              </tbody>
            </table>
          </div>
        </div>
    </>
  )
}

export default RatingCard
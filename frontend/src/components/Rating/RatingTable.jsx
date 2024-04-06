import React from 'react'
import './Rating.css'

function RatingTable({platform, platform_img, users}) {
  return (
    <>
        <div className='rating-table'>
          <div className='rating-table-header'>
            {/* <img className='table-platform-img' src={platform_img} alt="platform-image" />   */}
            {/* <p className="table-header-title">{platform}</p> */}
          </div>
          <div className='rating-table-body'>
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
                      <td className='table-user-rank'>{user.rank}</td>
                      <td className='table-user-name'>{user.name}</td>
                      <td className='table-user-rating'>{user.rating}</td>
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

export default RatingTable
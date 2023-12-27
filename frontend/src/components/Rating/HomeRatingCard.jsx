import React from 'react'

function HomeRatingCard({ users }) {
  return (
    <>
        <div className='home-rating-card'>
          <div className='home-rating-card-header'>
            <div className="header-img"></div>
            <div className="header-title"></div>
          </div>
          <div className='home-rating-card-body'>
            {
              users.map((user) => {
                <div>
                  <div>{user.rank}</div>
                  <div>{user.name}</div>
                  <div>{user.rating}</div>
                </div>
              })
            }
          </div>
        </div>
    </>
  )
}

export default HomeRatingCard
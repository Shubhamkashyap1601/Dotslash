import React from 'react'

function HomeRatingCard({platform ,platform_img, users}) {
  let num=0
  return (
    <>
        <div className='home-rating-card'>
          <div className='home-rating-card-header'>
            <img className='platform-img' src={platform_img} alt="platform-image" />  
            <p className="platform-title">{platform}</p>
          </div>
          <div className='home-rating-card-body'>
            {
              users.map((user) => {
              num++
              return (<div className={`rating-card-data bgclr-${num}`}>
                  {/* <div>{user.rank}</div> */}
                  <div className='rating-card-name'>{user.name}</div>
                  <div className='rating-card-rating'>{user.rating}</div>
              </div>)
              })
            }
          </div>
        </div>
    </>
  )
}

export default HomeRatingCard
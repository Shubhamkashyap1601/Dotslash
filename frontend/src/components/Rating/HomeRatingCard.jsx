import React from 'react'

function HomeRatingCard({ratingCard}) {
  const src = './src/assets/' + ratingCard.logo;
  let i = 1;
  return (
    <>
        <div className='home-rating-card'>
          <div className='home-rating-card-header'>
            <div className='home-rating-card-header-img'><img src={src} alt='Platform Logo' /></div>
            <div className='home-rating-card-header-title'><h4>{ratingCard.platform}</h4></div>
          </div>
          <div className='home-rating-card-body'>
            {/* {
              ratingCard.users.map(
                (user) => (
                  <div className='home-rating-card-user' key={i}>
                    <span className='home-rating-card-user-rank'>{i++}.</span> 
                    <span className='home-rating-card-user-name'>{user.name}</span>
                    <span className='home-rating-card-user-rating'>{user.rating}</span>
                  </div>
                )
              )
            } */}
          </div>
        </div>
    </>
  )
}

export default HomeRatingCard
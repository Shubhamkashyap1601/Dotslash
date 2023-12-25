import React from 'react'
import './HomeBlogCard.css';
function HomeBlogCard({blog}) {
  return (
    <>
        <div className="blog-card">

            <div className="blog-card-image">
                <img src={blog.image} alt="" />    
            </div>

            <div className="blog-card-title">
                <b>{blog.title}</b>
            </div>

            <div className="blog-card-body">
                <p>{blog.description}</p>
            </div>
            <div className="blog-card-footer">

                <div className="blog-card-likes-and-date">
                    {blog.date} &#8729; Likes: {blog.likes}
                </div>

                <div className="blog-card-author">
                    <h4>{blog.author}</h4>
                </div>

            </div>

        </div>
    </>
  )
}

export default HomeBlogCard
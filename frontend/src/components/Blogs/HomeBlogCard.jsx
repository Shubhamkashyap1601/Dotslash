import React from 'react'

function HomeBlogCard({blog}) {
  return (
    <>
        <div className="blog-card">
            <div className="blog-card-title">
                <h4>{blog.title}</h4>
            </div>
            <div className="blog-card-body">
                <p>{blog.description}</p>
                <img src={blog.image} alt="" />
            </div>
            <div className="blog-card-footer">
                <div className="blog-card-likes-and-date">
                    <p>{blog.date} | Likes: {blog.likes}</p>
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
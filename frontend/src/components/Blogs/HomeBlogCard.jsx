import React from 'react'
import './blogs.css';

function HomeBlogCard({blog}) {
  blog.imageURL = blog.imageURL || './src/assets/code_blog_img.jpg'
  return (
    <>
        <div className="blog-card">
            <div className="blog-card-image">
                <img src={blog.imageURL} alt="" />    
            </div>

            <div className="blog-card-title">
                <b>{blog.title}</b>
            </div>

            <div className="blog-card-body">
                <p>{blog.description}</p>
            </div>
            <div className="blog-card-footer">

                {/* <div className="blog-card-likes-and-date"> */}
                    <h4 className='blog-card-author'>{blog.author}</h4>
                    <p>{blog.likes} 💖</p>
                    {/*{blog.createdAt} &#8729;*/}
                {/* </div> */}

                {/* <div className="blog-card-author"> */}
                {/* </div> */}

            </div>

        </div>
    </>
  )
}

export default HomeBlogCard
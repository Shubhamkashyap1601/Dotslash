import React from "react";
import "./blogs.css";
import { NavLink } from "react-router-dom";

function HomeBlogCard({ blog }) {
  blog.imageURL = blog.imageURL || "./src/assets/code_blog_img.jpg";
  return (
    <>
      <div className="blog-card">
        <NavLink to={`/blog/${blog._id}`} className="blog-nav">
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
            <h4 className="blog-card-author">{blog.author}</h4>
            <p>{blog.likes} 💖</p>
          </div>
        </NavLink>
      </div>
    </>
  );
}

export default HomeBlogCard;

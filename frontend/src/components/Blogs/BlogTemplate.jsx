import React, { useEffect } from 'react';
import './blogs.css';

function BlogTemplate({ blog }) {
  return (
    <>
      {
        <div className={`blog-container dark-mode`}>
          <h1 className="blog-title">{blog.title}</h1>
          <div className="author-date">
            <span className="author">{blog.author}</span>
            <span className="date">{blog.createdAt}</span>
          </div>
          <div className="blog-body">
            <p>{blog.content}</p>
          </div>
          <div className="like-dislike">
            <span className="like-btn" role="img" aria-label="Like">💚 Like</span>
            <span className="dislike-btn" role="img" aria-label="Dislike">💔 Dislike</span>
          </div>
        </div>
      }
    </>
  );
}

export default BlogTemplate;

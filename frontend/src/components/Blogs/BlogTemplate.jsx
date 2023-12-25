import React, { useEffect } from 'react';
import './BlogTemplate.css';

function BlogTemplate({ darkMode }) {
  useEffect(() => {
    const styleElement = document.createElement('style');
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, [darkMode]);


  return (
    <div className={`blog-container ${darkMode ? 'dark-mode' : ''}`}>
      <h1 className="blog-title">Blog Title</h1>
      <div className="author-date">
        <span className="author">Author Name</span>
        <span className="date">December 24, 2023</span>
      </div>
      <div className="blog-body">
        <p>This is the body of your blog...</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
      <div className="like-dislike">
        <span className="like-btn" role="img" aria-label="Like">💚 Like</span>
        <span className="dislike-btn" role="img" aria-label="Dislike">💔 Dislike</span>
      </div>
    </div>
  );
}

export default BlogTemplate;

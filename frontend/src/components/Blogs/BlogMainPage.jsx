import React, { useState, useEffect } from 'react'
import BlogTemplate from './BlogTemplate'
import { Link } from 'react-router-dom';

function BlogMainPage({ pageText }) {
  const [blogs, setBlogs] = useState([]);

  const fetchData = async () => {
    try {
      await fetch('/api/fetch-blogs', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (response) => await response.json())
        .then((data) => {
          setBlogs(data);
        })
        .catch((error) => {
          console.error("Error Reading blog:", error);
        });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (blogs.length != 0) {
    return (
      <>
        <div className="home-blog-page">
          <div className="blog-main-container">
            {
              blogs.map((blog) => (
                <BlogTemplate blog={blog} key={blog._id} />
              ))
            }
          </div>
            <Link to="create-blog"><button className='create-blog-btn'>Create Blog</button></Link>
        </div>
      </>
    )
  }
}

export default BlogMainPage
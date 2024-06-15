import React, { useState, useEffect } from 'react'
import BlogTemplate from './BlogTemplate'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function BlogMainPage() {
  const [blogs, setBlogs] = useState([]);
  
  const fetchData = async () => {
    let response;
    try {
      response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/fetch-blogs`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
      })
      if(response.ok){
          const data = await response.json();
          setBlogs(data);
      }
      else{
          toast.warning("Please Login to view Blogs",{
              position:toast.POSITION.BOTTOM_LEFT
          })
      }
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
        <div className="blog-page">
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
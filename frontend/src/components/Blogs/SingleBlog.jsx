import React, { useEffect } from "react";
import BlogTemplate from "./BlogTemplate.jsx";
import { useParams } from "react-router-dom";
import { useState } from "react";

function SingleBlog() {

  const [blog, setBlog] = useState([])
  const blogId = useParams().blogId;
  const fetchBlog = async () => {
    try {

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/blog/${blogId}`, { method: "GET" });
      if (response.ok) {
        const res = await response.json();
        // console.log(res);
        setBlog(res.data);
    }
      console.log(blogId);

    } catch (error) {
      console.error("Something went wrong while fetching one blog:", error);
    }
  };
  useEffect(() => {
    fetchBlog();
  }, [])

  if(blog !== undefined)
  {
    return(
        
        <BlogTemplate blog={blog} key={blogId} />
    )
  }
}

export default SingleBlog;

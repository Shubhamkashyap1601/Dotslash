import React, { useState, useEffect } from 'react'
import HomeBlogCard from './HomeBlogCard'
import '../Blogs/blogs.css'
import { toast } from 'react-toastify';
function Blogs() {
    const [blogs, setBlogs] = useState([])

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
        } catch (error) {
            console.error("Error fetching the blogs from server : ",error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (blogs.length != 0) {
        blogs.sort((blog1, blog2) => blog2.likes - blog1.likes);
        return (
            <>
                <div className="home-blog">
                    <div className="home-blog-header">
                        Most liked blogs!
                    </div>
                    <div className="home-blog-container">
                        { blogs.map((blog) => (<HomeBlogCard blog={blog} />)) }
                    </div>
                </div>
            </>
        )
    }
}

export default Blogs
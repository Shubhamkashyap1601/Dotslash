import React, { useState, useEffect } from 'react'
import HomeBlogCard from './HomeBlogCard'
import '../Blogs/blogs.css'
function Blogs() {
    const [blogs, setBlogs] = useState([])

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
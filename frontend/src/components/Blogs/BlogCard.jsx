import React from 'react';
import './BlogCard.css';

const BlogCard = ({ title, author, content }) => {
    return (
        <div className="blog-card">
            <h2>{title}</h2>
            <p>By {author}</p>
            <p>{content}</p>
        </div>
    );
};

export default BlogCard;

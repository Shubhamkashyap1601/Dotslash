import React, { useEffect, useState } from "react";
import "./blogs.css";

function BlogTemplate({ blog }) {
  const [likes, setLikes] = useState(blog.likes);
  const [likeEmoji, setLikeEmoji] = useState("🤍");
  const [isClickDisabled, setClickDisabled] = useState(false);

  const handleLikeClick = async () => {
    if(isClickDisabled){ 
      return;
    }
    setClickDisabled(!isClickDisabled);
    try {
      const response = await fetch("/api/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: blog._id }),
      });

      if (response.ok) {
        await response.json().then((data) => {
          setLikes(data.likes);
          if (likeEmoji === "🤍") setLikeEmoji("💖");
          else setLikeEmoji("🤍");
        });
      } else {
        console.error("Failed to update likes");
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    }
    setClickDisabled(false);
  };

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
            <span
              className="like-btn"
              role="img"
              aria-label="Like"
              onClick={handleLikeClick}
            >
              {likeEmoji} {likes} Like
            </span>
          </div>
        </div>
      }
    </>
  );
}

export default BlogTemplate;

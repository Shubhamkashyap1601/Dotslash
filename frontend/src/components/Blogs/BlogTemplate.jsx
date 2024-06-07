import React, { useEffect, useState } from "react";
import "./blogs.css";
import { NavLink } from "react-router-dom";

function BlogTemplate({ blog }) {
  const [likes, setLikes] = useState(blog.likes);
  const [likeEmoji, setLikeEmoji] = useState(() => {
    if (blog.isLiked) return "💖";
    else return "🤍";
  });
  const [isLikeDisabled, setIsLikeDisabled] = useState(false);

  const handleLikeClick = async () => {
    if (isLikeDisabled) return;
    setIsLikeDisabled(!isLikeDisabled);

    if (likeEmoji === "💖") {
      setLikes((prev) => prev - 1);
      setLikeEmoji("🤍");
    } else {
      setLikes((prev) => prev + 1);
      setLikeEmoji("💖");
    }
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
        });
      } else {
        if (likeEmoji === "💖") {
          setLikes((prev) => prev - 1);
          setLikeEmoji("🤍");
        } else {
          setLikes((prev) => prev + 1);
          setLikeEmoji("💖");
        }
        console.error("Failed to update likes");
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    } finally {
      setIsLikeDisabled(false);
    }
  };
  useEffect(() => {
    // console.log(blog);
    setLikes(blog.likes);

    setLikeEmoji(() => {
      if (blog.isLiked) return "💖";
      else return "🤍";
    });
  }, [blog]);
  return (
    <>
      {/* <nav> */}
      {/* <NavLink to={`/api/blog/${blog._id}`}> */}
      <div className={`blog-container dark-mode`}>
        <nav>
          <NavLink to={`/blog/${blog._id}`} className="blog-nav">
            <h1 className="blog-title">{blog.title}</h1>
          </NavLink>
        </nav>
        <div className="author-date">
          <span className="author">{blog.author}</span>
          <span className="date">{blog.createdAt}</span>
        </div>
        <div className="blog-body">
          <div className="blog-body-image">
            <img src={blog.imageURL} />
          </div>
          <div className="blog-body-content">
            <p>{blog.content}</p>
          </div>
        </div>
        <div className="like-dislike">
          <span
            className="like-btn"
            role="img"
            aria-label="Like"
            onClick={handleLikeClick}
          >
            {likeEmoji} {likes} Likes
          </span>
        </div>
      </div>
      {/* // </NavLink> */}
      {/* </nav> */}
    </>
  );
}

export default BlogTemplate;

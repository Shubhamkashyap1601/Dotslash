import React, { useRef } from 'react'
import './blogs.css'
import { Link } from 'react-router-dom';


function CreateBlog() {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const contentRef = useRef();

  const sendDataToBackend = async (data) => {
    fetch('/api/create-blog', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from backend for blog creation:", data);
      })
      .catch((error) => {
        console.error("Error creating blog:", error);
      });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Blog creation started.");
    const formData = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      content: contentRef.current.value,
    };
    console.log(formData);
    await sendDataToBackend(formData);
  }

  return (
    <>
      <div className='create-blog-container'>

        <div className="title">
          <label className="title label">Title</label>
          <input type="text" name='title' className="title input" placeholder='Title' ref={titleRef} />
        </div>

        <div className="desc">
          <label className="desc label">Blog Description</label>
          <input type="text" name='description' className="desc input" placeholder='Brief Description about the blog' maxLength="200" ref={descriptionRef} />
        </div>

        <div className="blog-content">
          <label className="blog-content label">Content</label>

          <textarea name='content' className="blog-content input" placeholder='Blog Content' ref={contentRef} />
        </div>

        <div className="file">
          <label className="file label">Add Attachments</label>
          <input className="file-box" type="file" />
        </div>

        <div className="submit">
          <Link to='blogs'><button className="submit-btn" value="Upload" onClick={handleSubmit}>Upload</button> </Link>
        </div>
      </div>
    </>
  )
}

export default CreateBlog
import React, { useRef, useState } from 'react'
import './blogs.css'
import { useNavigate, Link } from 'react-router-dom';

function CreateBlog() {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const contentRef = useRef();
  const imageRef = useRef();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);

  const sendDataToBackend = async (data) => {
    setIsDisabled(true);
    fetch('/api/create-blog', {
      method: "POST",
      body: data,
    })
      .then((response) => {
        if (response.ok) navigate('../blogs');
      })
      .catch((error) => {
        console.error("Error creating blog:", error);
      })
      .finally(() => { setIsDisabled(false) });
  };

  const handleSubmit = async (e) => {
    if (isDisabled) return;
    e.preventDefault();
    console.log("Blog creation started.");
    const formData = new FormData();
    formData.append('title', titleRef.current.value)
    formData.append('description', descriptionRef.current.value)
    formData.append('content', contentRef.current.value)
    formData.append('imageURL', imageRef.current.files[0])
    await sendDataToBackend(formData);
  }

  return (
    <>
      <div className="blog-page">

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
            <input className="file-box" type="file" ref={imageRef} />
          </div>

          <div className="submit">
            <button className="submit-btn" value="Upload" onClick={handleSubmit}>Upload</button>
          </div>
        </div>
        <Link to="../blogs"><button className='create-blog-btn' id='back-symbol'>&#8592;</button></Link>
      </div>
    </>
  )
}

export default CreateBlog
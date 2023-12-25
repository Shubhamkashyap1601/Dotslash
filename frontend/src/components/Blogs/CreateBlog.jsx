import React from 'react'
import './CreateBlog.css'
function CreateBlog() {

    return (
        <>
        <p class="page-title">Contribute to DotSlash Community</p>

        <div class='create-blog-container'>

          <div class ="title">
            <label class="title label">Title</label>
            <input type="text" class = "title input" placeholder='Title'/>
          </div>

          <div class ="desc">
            <label class="desc label">Blog Description</label>
            <input type="text" class = "desc input" placeholder='Brief Description about the blog'maxLength="200"/>
          </div>

          <div class ="blog-content">
            <label class="blog-content label">Content</label>
            <input type="text" class = "blog-content input" placeholder='Blog Content' />
          </div>

          <div class="file">
            <label class="file label">Add Attachments</label>
            <input class="file-box" type="file" />
          </div>

          <div class="submit">
            <button class="submit-btn" value="Upload" >Upload</button>
          </div>
        </div>
        </>
    )
}

export default CreateBlog
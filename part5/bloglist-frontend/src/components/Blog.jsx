import { useState } from 'react'
import blogsService from '../services/blogs'

const Blog = ({ blog, updateBlog, deleteBlog, currentUser }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    updateBlog(updatedBlog)
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleDetails}>
          {showDetails ? 'Hide' : 'View'}
        </button>
      </div>
      {showDetails && (
        <div>
          <p>{blog.url}</p>
          <p>
            likes: {blog.likes}
            <button onClick={handleLike}>like</button>
          </p>
          <p>{blog.user.username}</p>
          <button onClick={() => deleteBlog(blog)}>
              remove
          </button>
        </div>
      )}
    </div>
  )
}

export default Blog

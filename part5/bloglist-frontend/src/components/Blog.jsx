import { useState } from 'react'
import blogsService from '../services/blogs'

const Blog = ({ blog, updateBlog }) => {
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

  const handleLike = async () => {
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    
    try {
      const returnedBlog = await blogsService.update(blog.id, updatedBlog)
      updateBlog(returnedBlog)
    } catch (error) {
      console.error('Error updating likes:', error)
    }
  }

  return (
    <div style={blogStyle}>
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
        </div>
      )}
    </div>
  )
}

export default Blog

import { useState } from 'react'
import { Link } from 'react-router-dom'
import useBlogStore from '../stores/blogStore'
import useNotificationStore from '../stores/notificationStore'
import useUserStore from '../stores/userStore'

const Blog = ({ blog, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const currentUser = useUserStore(state => state.user)
  const likeBlog = useBlogStore(state => state.likeBlog)
  const showNotification = useNotificationStore(state => state.showNotification)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleLike = async () => {
    try {
      await likeBlog(blog)
    } catch (exception) {
      showNotification(`Failed to like blog '${blog.title}'`, 'error')
    }
  }

  return (
    <div style={blogStyle} className="blog" data-testid="blog">
      <div>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
        <button onClick={toggleDetails}>{showDetails ? 'Hide' : 'View'}</button>
      </div>
      {showDetails && (
        <div>
          <p>{blog.url}</p>
          <p>
            likes: <span data-testid="likes">{blog.likes}</span>
            <button data-testid="like-button" onClick={handleLike}>
              like
            </button>
          </p>
          {blog.user && <p>{blog.user.username}</p>}
          {blog.user?.username === currentUser?.username && (
            <button
              data-testid="remove-button"
              onClick={() => deleteBlog(blog)}
            >
              Remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog

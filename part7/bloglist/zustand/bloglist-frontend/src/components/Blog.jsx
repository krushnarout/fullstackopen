import { useState } from 'react'
import { Button, Paper } from '@mui/material'
import { Link } from 'react-router-dom'
import useBlogStore from '../stores/blogStore'
import useNotificationStore from '../stores/notificationStore'
import useUserStore from '../stores/userStore'

const Blog = ({ blog, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const currentUser = useUserStore(state => state.user)
  const likeBlog = useBlogStore(state => state.likeBlog)
  const showNotification = useNotificationStore(state => state.showNotification)

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
    <Paper sx={{ p: 1.5, mb: 1 }} className="blog" data-testid="blog">
      <div>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
        <Button size="small" onClick={toggleDetails}>
          {showDetails ? 'Hide' : 'View'}
        </Button>
      </div>
      {showDetails && (
        <div>
          <p>{blog.url}</p>
          <p>
            likes: <span data-testid="likes">{blog.likes}</span>
            <Button size="small" data-testid="like-button" onClick={handleLike}>
              like
            </Button>
          </p>
          {blog.user && <p>{blog.user.username}</p>}
          {blog.user?.username === currentUser?.username && (
            <Button
              size="small"
              color="error"
              data-testid="remove-button"
              onClick={() => deleteBlog(blog)}
            >
              Remove
            </Button>
          )}
        </div>
      )}
    </Paper>
  )
}

export default Blog

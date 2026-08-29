import { Button, Link as MuiLink, Paper, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import useBlogStore from '../stores/blogStore'
import useUserStore from '../stores/userStore'
import useNotificationStore from '../stores/notificationStore'
import CommentForm from './CommentForm'

const BlogView = ({ deleteBlog }) => {
  const { id } = useParams()

  const blogs = useBlogStore(state => state.blogs)
  const initialized = useBlogStore(state => state.initialized)
  const likeBlog = useBlogStore(state => state.likeBlog)
  const addCommentToStore = useBlogStore(state => state.addComment)
  const currentUser = useUserStore(state => state.user)
  const showNotification = useNotificationStore(state => state.showNotification)

  const blog = blogs.find(blog => blog.id === id)

  if (!blog) {
    return <div>{initialized ? 'Blog not found' : null}</div>
  }

  const handleLike = async () => {
    try {
      await likeBlog(blog)
    } catch (exception) {
      showNotification(`Failed to like blog '${blog.title}'`, 'error')
    }
  }

  // returns whether the comment went through, so the form knows to clear
  const addComment = async comment => {
    try {
      await addCommentToStore(blog.id, comment)
      showNotification('Comment added', 'success')
      return true
    } catch (exception) {
      showNotification('Failed to add comment', 'error')
      return false
    }
  }

  const comments = blog.comments ?? []

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4">{blog.title}</Typography>
      <Typography color="text.secondary">by {blog.author}</Typography>
      <MuiLink href={blog.url}>{blog.url}</MuiLink>
      {blog.user && (
        <Typography color="text.secondary">
          Added by {blog.user.name || blog.user.username}
        </Typography>
      )}
      <Typography component="div" sx={{ my: 1 }}>
        <span data-testid="likes">{blog.likes}</span> likes
        <Button
          variant="outlined"
          size="small"
          sx={{ ml: 1 }}
          data-testid="like-button"
          onClick={handleLike}
        >
          like
        </Button>
      </Typography>
      {blog.user?.username === currentUser?.username && (
        <Button
          variant="outlined"
          color="error"
          size="small"
          data-testid="remove-button"
          onClick={() => deleteBlog(blog)}
        >
          Remove
        </Button>
      )}

      <Typography variant="h6" sx={{ mt: 2 }}>
        comments
      </Typography>
      <CommentForm addComment={addComment} />
      {comments.length === 0 ? (
        <p>no comments yet</p>
      ) : (
        <ul>
          {comments.map((comment, index) => (
            <li key={index} data-testid="comment">
              {comment}
            </li>
          ))}
        </ul>
      )}
    </Paper>
  )
}

export default BlogView

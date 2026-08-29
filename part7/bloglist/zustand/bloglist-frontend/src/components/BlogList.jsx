import { Typography } from '@mui/material'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import useBlogStore from '../stores/blogStore'

const BlogList = ({ createBlog, deleteBlog }) => {
  const blogs = useBlogStore(state => state.blogs)

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        blogs
      </Typography>
      <Togglable buttonLabel="Create new blog">
        <BlogForm createBlog={createBlog} />
      </Togglable>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} />
        ))}
    </div>
  )
}

export default BlogList

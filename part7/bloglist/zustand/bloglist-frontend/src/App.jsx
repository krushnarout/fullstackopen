import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import useNotificationStore from './stores/notificationStore'
import useBlogStore from './stores/blogStore'
import useUserStore from './stores/userStore'
import './index.css'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const showNotification = useNotificationStore(state => state.showNotification)

  const blogs = useBlogStore(state => state.blogs)
  const initializeBlogs = useBlogStore(state => state.initializeBlogs)
  const createBlogToStore = useBlogStore(state => state.createBlog)
  const deleteBlogFromStore = useBlogStore(state => state.deleteBlog)

  const user = useUserStore(state => state.user)
  const initializeUser = useUserStore(state => state.initializeUser)
  const login = useUserStore(state => state.login)
  const logout = useUserStore(state => state.logout)

  const handleLogin = async event => {
    event.preventDefault()
    try {
      await login({ username, password })
      setUsername('')
      setPassword('')
      showNotification('User logged in successfully', 'success')
    } catch (exception) {
      showNotification('Wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    logout()
    showNotification('Logged out successfully', 'success')
  }

  const createBlog = async blog => {
    try {
      const createdBlog = await createBlogToStore(blog)
      showNotification(
        `A new blog ${createdBlog.title} by ${createdBlog.author} added`,
        'success'
      )
    } catch (exception) {
      showNotification('Failed to create new blog', 'error')
    }
  }

  const deleteBlog = async blogToDelete => {
    try {
      if (
        window.confirm(
          `Remove blog ${blogToDelete.title} by ${blogToDelete.author}?`
        )
      ) {
        await deleteBlogFromStore(blogToDelete)
        showNotification(
          `Blog '${blogToDelete.title}' was successfully deleted`,
          'success'
        )
      }
    } catch (exception) {
      showNotification('Failed to delete blog', 'error')
    }
  }

  useEffect(() => {
    initializeBlogs()
  }, [initializeBlogs])

  useEffect(() => {
    initializeUser()
  }, [initializeUser])

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            username{' '}
            <input
              type="text"
              data-testid="username"
              name="Username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password{' '}
            <input
              type="password"
              data-testid="password"
              name="Password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">log in</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.username} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
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

export default App

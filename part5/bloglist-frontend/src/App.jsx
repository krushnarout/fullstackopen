import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState({ message: '', type: '' })

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: '', type: '' }), 5000)
  }

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
      showNotification('User logged in successfully', 'success')
    } catch (exception) {
      showNotification('Wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    showNotification('Logged out successfully', 'success')
  }

  const updateBlog = (updatedBlog) => {
    setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))
  }

  const createBlog = async blog => {
    try {
      const createdBlog = await blogService.create(blog)
      const blogWithUser = {
        ...createdBlog,
        user: {
          username: user.username,
          name: user.name,
          id: user.id
        }
      }
      setBlogs(blogs.concat(blogWithUser))
      showNotification(`A new blog ${createdBlog.title} by ${createdBlog.author} added`, 'success')
    } catch (exception) {
      showNotification('Failed to create new blog', 'error')
    }
  }

  const deleteBlog = async (blogToDelete) => {
    try {
      if (window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}?`)) {
        await blogService.remove(blogToDelete.id)
        setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
        showNotification(`Blog '${blogToDelete.title}' was successfully deleted`, 'success')
      }
    } catch (exception) {
      showNotification('Failed to delete blog', 'error')
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))
    if (loggedUser) {
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notification.message} type={notification.type} />
        <form onSubmit={handleLogin}>
          <div>
            username{' '}
            <input
              type="text"
              name="Username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password{' '}
            <input
              type="password"
              name="Password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification.message} type={notification.type} />
      <div>
        {user.username} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <Togglable buttonLabel="Create new blog">
        <BlogForm
          createBlog={createBlog}
        />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
            currentUser={user}
          />
        ))}
    </div>
  )
}

export default App
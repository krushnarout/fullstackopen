import { useEffect } from 'react'
import { Container } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import Menu from './components/Menu'
import BlogList from './components/BlogList'
import Users from './components/Users'
import User from './components/User'
import BlogView from './components/BlogView'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import useNotificationStore from './stores/notificationStore'
import useBlogStore from './stores/blogStore'
import useUserStore from './stores/userStore'
import useUsersStore from './stores/usersStore'
import './index.css'

const App = () => {
  const showNotification = useNotificationStore(state => state.showNotification)

  const initializeBlogs = useBlogStore(state => state.initializeBlogs)
  const createBlogToStore = useBlogStore(state => state.createBlog)
  const deleteBlogFromStore = useBlogStore(state => state.deleteBlog)

  const user = useUserStore(state => state.user)
  const initializeUser = useUserStore(state => state.initializeUser)

  const initializeUsers = useUsersStore(state => state.initializeUsers)
  const logout = useUserStore(state => state.logout)

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

  useEffect(() => {
    initializeUsers().catch(() =>
      showNotification('Failed to fetch users', 'error')
    )
  }, [initializeUsers, showNotification])

  if (user === null) {
    return (
      <Container sx={{ pt: 3 }}>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm />
      </Container>
    )
  }

  return (
    <div>
      <Menu user={user} onLogout={handleLogout} />
      <Container sx={{ pb: 4 }}>
        <Notification />
        <Routes>
          <Route
            path="/blogs/:id"
            element={<BlogView deleteBlog={deleteBlog} />}
          />
          <Route path="/users/:id" element={<User />} />
          <Route path="/users" element={<Users />} />
          <Route
            path="/"
            element={
              <BlogList createBlog={createBlog} deleteBlog={deleteBlog} />
            }
          />
        </Routes>
      </Container>
    </div>
  )
}

export default App

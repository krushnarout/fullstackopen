import { Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import useUsersStore from '../stores/usersStore'

const User = () => {
  const { id } = useParams()
  const users = useUsersStore(state => state.users)
  const initialized = useUsersStore(state => state.initialized)

  const user = users.find(user => user.id === id)

  if (!user) {
    return <div>{initialized ? 'User not found' : null}</div>
  }

  const blogs = user.blogs ?? []

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {user.name || user.username}
      </Typography>
      <Typography variant="h6">added blogs</Typography>
      {blogs.length === 0 ? (
        <p>no blogs added</p>
      ) : (
        <ul>
          {blogs.map(blog => (
            <li key={blog.id} data-testid="user-blog">
              {blog.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default User

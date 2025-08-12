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
      <h2>{user.name || user.username}</h2>
      <h3>added blogs</h3>
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

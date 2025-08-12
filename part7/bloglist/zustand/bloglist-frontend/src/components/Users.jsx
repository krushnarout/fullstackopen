import { useEffect } from 'react'
import useUsersStore from '../stores/usersStore'
import useNotificationStore from '../stores/notificationStore'

const Users = () => {
  const users = useUsersStore(state => state.users)
  const initializeUsers = useUsersStore(state => state.initializeUsers)
  const showNotification = useNotificationStore(state => state.showNotification)

  useEffect(() => {
    initializeUsers().catch(() =>
      showNotification('Failed to fetch users', 'error')
    )
  }, [initializeUsers, showNotification])

  return (
    <div>
      <h2>Users</h2>
      <table className="users">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} data-testid="user">
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.blogs?.length ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users

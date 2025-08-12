import { Link } from 'react-router-dom'
import useUsersStore from '../stores/usersStore'

const Users = () => {
  const users = useUsersStore(state => state.users)

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
              <td>
                <Link to={`/users/${user.id}`}>
                  {user.name || user.username}
                </Link>
              </td>
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

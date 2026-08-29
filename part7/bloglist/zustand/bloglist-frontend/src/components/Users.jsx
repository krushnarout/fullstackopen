import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'
import useUsersStore from '../stores/usersStore'

const Users = () => {
  const users = useUsersStore(state => state.users)

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id} data-testid="user">
                <TableCell>
                  <Link to={`/users/${user.id}`}>
                    {user.name || user.username}
                  </Link>
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.blogs?.length ?? 0}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users

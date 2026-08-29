import { AppBar, Toolbar, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const Menu = ({ user, onLogout }) => (
  <AppBar position="static" sx={{ mb: 3 }}>
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Blog App
      </Typography>
      <Button color="inherit" component={Link} to="/">
        blogs
      </Button>
      <Button color="inherit" component={Link} to="/users">
        users
      </Button>
      <Typography sx={{ ml: 2 }}>
        {user.name || user.username} logged in
      </Typography>
      <Button color="inherit" onClick={onLogout}>
        logout
      </Button>
    </Toolbar>
  </AppBar>
)

export default Menu

import { Link } from 'react-router-dom'

const Menu = ({ user, onLogout }) => {
  const style = {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: 8,
    marginBottom: 10,
    backgroundColor: '#dfdfdf',
  }

  return (
    <div style={style}>
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
      <span>
        {user.name || user.username} logged in
        <button onClick={onLogout}>logout</button>
      </span>
    </div>
  )
}

export default Menu

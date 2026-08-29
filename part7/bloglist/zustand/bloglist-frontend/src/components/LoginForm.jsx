import { Box, Button, TextField } from '@mui/material'
import useUserStore from '../stores/userStore'
import useNotificationStore from '../stores/notificationStore'
import { useField } from '../hooks'

const LoginForm = () => {
  const username = useField('text')
  const password = useField('password')

  const login = useUserStore(state => state.login)
  const showNotification = useNotificationStore(state => state.showNotification)

  const handleLogin = async event => {
    event.preventDefault()
    try {
      await login({
        username: username.inputProps.value,
        password: password.inputProps.value,
      })
      username.reset()
      password.reset()
      showNotification('User logged in successfully', 'success')
    } catch (exception) {
      showNotification('Wrong username or password', 'error')
    }
  }

  return (
    <Box component="form" onSubmit={handleLogin} sx={{ maxWidth: 320 }}>
      <TextField
        {...username.inputProps}
        label="username"
        name="Username"
        margin="dense"
        fullWidth
        slotProps={{ htmlInput: { 'data-testid': 'username' } }}
      />
      <TextField
        {...password.inputProps}
        label="password"
        name="Password"
        margin="dense"
        fullWidth
        slotProps={{ htmlInput: { 'data-testid': 'password' } }}
      />
      <Button type="submit" variant="contained" sx={{ mt: 1 }}>
        log in
      </Button>
    </Box>
  )
}

export default LoginForm

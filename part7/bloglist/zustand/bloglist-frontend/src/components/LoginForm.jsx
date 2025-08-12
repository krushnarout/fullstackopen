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
    <form onSubmit={handleLogin}>
      <div>
        username{' '}
        <input
          {...username.inputProps}
          data-testid="username"
          name="Username"
        />
      </div>
      <div>
        password{' '}
        <input
          {...password.inputProps}
          data-testid="password"
          name="Password"
        />
      </div>
      <button type="submit">log in</button>
    </form>
  )
}

export default LoginForm

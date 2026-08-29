import { Alert } from '@mui/material'
import useNotificationStore from '../stores/notificationStore'

const Notification = () => {
  const message = useNotificationStore(state => state.message)
  const type = useNotificationStore(state => state.type)

  if (!message) {
    return null
  }

  return (
    <Alert
      severity={type === 'error' ? 'error' : 'success'}
      className={`notification ${type}`}
      sx={{ mb: 2 }}
    >
      {message}
    </Alert>
  )
}

export default Notification

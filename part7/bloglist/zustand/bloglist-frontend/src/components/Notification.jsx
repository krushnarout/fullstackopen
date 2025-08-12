import useNotificationStore from '../stores/notificationStore'

const Notification = () => {
  const message = useNotificationStore(state => state.message)
  const type = useNotificationStore(state => state.type)

  if (!message) {
    return null
  }

  return <div className={`notification ${type}`}>{message}</div>
}

export default Notification

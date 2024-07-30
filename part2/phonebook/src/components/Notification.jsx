const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  }

  const notificationStyle = {
    color: isError ? 'red' : 'green',
  }

  return (
    <div className="notification" style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification
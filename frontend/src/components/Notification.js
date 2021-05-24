import React from 'react'
import '../scss/components/notification.scss'

const messages = {
  503: 'Backend service is unavailable',
  429: 'Too Many Requests',
}

function Notification(props) {
  const { data } = props
  const { visible, status } = data
  const defaultMessage = 'Something went wrong. Try again!'
  const message = messages[status] || defaultMessage
  if (visible) {
    return (
      <div className='notification-container'>
        <i className='fas fa-exclamation-circle'></i>
        <span>{message}</span>
      </div>
    )
  }

  return null
}

export default Notification

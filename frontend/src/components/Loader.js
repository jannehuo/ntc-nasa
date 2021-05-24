import React from 'react'
import '../scss/components/loader.scss'

function Loader(props) {
  const { visible } = props
  if (visible) {
    return (
      <div className='loader-container'>
        <h1>Fetching data. Please wait.</h1>
        <div className='loader-icon-container'>
          <i className='fas fa-meteor' aria-hidden='true'></i>
        </div>
      </div>
    )
  }
  return null
}

export default Loader

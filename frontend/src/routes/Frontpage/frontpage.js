import React, { useState } from 'react'
import apiCall from '../../helpers/api'
import AsteroiData from '../../components/AsteroidData'
import Loader from '../../components/Loader'
import Notification from '../../components/Notification'

const url = 'http://localhost:8000/closest'

const initialApiState = { visible: false, status: undefined }

function Frontpage() {
  const [asteroidData, setAstedoidData] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState(initialApiState)

  const handleApiError = (err) => {
    setApiError({ visible: true, status: err.status })
  }

  React.useEffect(() => {
    setLoading(true)
    setApiError(false)
    apiCall(url)
      .then((res) => {
        setLoading(false)
        if (res.status) {
          handleApiError(res)
        } else {
          setAstedoidData(res)
        }
      })
      .catch((err) => {
        handleApiError(err)
        setLoading(false)
      })
  }, [])
  return (
    <div role='status'>
      {!loading && (
        <React.Fragment>
          <h1>Closest asteroid</h1>
          <p>Between: 16-12-2015 - 22-12-2015</p>
          <AsteroiData data={asteroidData} mode='closest' />
        </React.Fragment>
      )}
      <Loader visible={loading} />
      <Notification data={apiError} />
    </div>
  )
}

export default Frontpage

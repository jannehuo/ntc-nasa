import React, { useState } from 'react'
import AsteroiData from '../../components/AsteroidData'
import Loader from '../../components/Loader'
import Notification from '../../components/Notification'
import apiCall from '../../helpers/api'
import focusOnElement from '../../helpers/dom'
import '../../scss/components/form.scss'

const url = 'http://localhost:8000/largest'
const initialApiState = { visible: false, status: undefined }

function Year() {
  const [year, setYear] = useState('')
  const [loading, setLoading] = useState(false)
  const [asteroidData, setAstedoidData] = useState(undefined)
  const [showError, setShowError] = useState(false)
  const [errorText, setErrorText] = useState('')
  const [apiError, setApiError] = useState(initialApiState)

  const checkInputError = (value) => {
    const isNotLn4 = value.length !== 4
    const isNotNumber = Number.isNaN(parseInt(value, 10))
    if (isNotLn4) {
      setErrorText('Year has to be 4 digits')
    }
    if (isNotNumber) {
      setErrorText('Year value has to be number')
    }
    return isNotLn4 || isNotNumber
  }

  const handleYearInput = (e) => {
    const value = e.target.value
    setYear(value)
  }

  const handleApiError = (err) => {
    setApiError({ visible: true, status: err.status })
  }

  const submitQuery = (e) => {
    e.preventDefault()
    const hasErrors = checkInputError(year)
    if (hasErrors) {
      setShowError(true)
      focusOnElement('year')
    } else {
      setAstedoidData(undefined)
      setShowError(false)
      setLoading(true)
      setApiError(initialApiState)
      apiCall(url + `/${year}`)
        .then((res) => {
          setLoading(false)
          if (res.status) {
            handleApiError(res)
          } else {
            setAstedoidData(res)
          }
        })
        .catch((err) => {
          setLoading(false)
          handleApiError(err)
        })
    }
  }
  return (
    <div className='form-container'>
      <h1>Search</h1>
      <p className='form-info-text'>
        You can find the largest asteroid by given year. Start by typing the
        desired year and click search.
      </p>
      <form>
        <div className='input-container'>
          <label htmlFor='year'>Year</label>
          <input
            className='input-element'
            type='number'
            id='year'
            name='year'
            value={year}
            onChange={handleYearInput}
            placeholder='Type in year'
            aria-describedby='year-input-error'
            aria-invalid={showError}
          />
          {showError && (
            <p className='form-error-text' id='year-input-error'>
              {errorText}
            </p>
          )}
        </div>
        <div className='input-container'>
          <input
            className='btn'
            type='submit'
            value='search'
            onClick={submitQuery}
            disabled={loading}
          />
        </div>
      </form>
      <div role='status'>
        <Loader visible={loading} />
        <AsteroiData data={asteroidData} mode='largest' />
        <Notification data={apiError} />
      </div>
    </div>
  )
}

export default Year

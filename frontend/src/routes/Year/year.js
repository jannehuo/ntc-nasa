import React, { useState } from 'react'

function Year() {
  const [year, setYear] = useState('')
  const [loading, setLoading] = useState(false)

  const checkInputError = (value) => {
    /** TODO: Check some errors
     *  Input lenghts(min,max): maybe 4 for both?
     *  Input value type: has to be number
     */
    return true
  }

  const handleYearInput = (e) => {
    const value = e.target.value
    setYear(value)
  }
  const submitQuery = (e) => {
    e.preventDefault()
    const hasErrors = checkInputError(year)
    /** TODO:
     * Send year value to backend
     *  - handle input errors
     * Show loader while data is being fetched
     *  - handle failed request
     * After loading show asteroid data
     * Or in case of error show error notification
     * Create styles for form
     *
     * */
  }
  return (
    <div className='form-container'>
      <h1>Search</h1>
      <p>Form info text</p>
      <form>
        <div className='input-container'>
          <label htmlFor='year'>Year</label>
          <input
            type='text'
            id='year'
            name='year'
            value={year}
            onChange={handleYearInput}
          />
          <button onClick={submitQuery} type='submit'>
            Search
          </button>
        </div>
      </form>
    </div>
  )
}

export default Year

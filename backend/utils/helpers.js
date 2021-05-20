const constants = require('../constants')
const _ = require('lodash')

function getLargestAsteroid(data) {
  const sorted = data.sort(
    (a, b) =>
      a.estimated_diameter.estimated_diameter_max -
      b.estimated_diameter.estimated_diameter_max
  )
  return sorted[0]
}

function createAsteroidsList(data) {
  const keys = Object.keys(data)
  const asteroidsList = keys.reduce((acc, key) => {
    const asteroidData = data[key]
    acc.push(...asteroidData)
    return acc
  }, [])
  return asteroidsList
}

function createDateString(date) {
  if (date) {
    return date.toISOString().split('T')[0]
  }
  return null
}

function datesBetweenRange(start, end) {
  let dates = []
  const startDate = new Date(start)
  const endDate = new Date(end)
  while (startDate <= endDate) {
    dates = [...dates, new Date(startDate)]
    startDate.setDate(startDate.getDate() + 1)
  }
  return dates.map(createDateString)
}

function createApiCalls(start, end) {
  const datesList = datesBetweenRange(start, end)
  const dateChunks = _.chunk(datesList, 7)
  const urls = dateChunks.reduce((acc, curr) => {
    const start = _.head(curr)
    const end = _.last(curr)
    const url = createApiUrl(start, end)
    acc.push(url)
    return acc
  }, [])
  return urls
}

function createApiUrl(start, end) {
  return `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start}&end_date=${end}&api_key=${constants.API_KEY}`
}

function isLeapYear(year) {
  return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0
}

module.exports = {
  createAsteroidsList,
  getLargestAsteroid,
  createApiCalls,
  datesBetweenRange,
  createApiUrl,
  isLeapYear,
  createDateString,
}

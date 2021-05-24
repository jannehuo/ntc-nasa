const constants = require('../constants')
const _ = require('lodash')

function sortMissDistances(distances) {
  return distances.sort((a, b) => {
    parseFloat(a.miss_distance.lunar) - parseFloat(b.miss_distance.lunar)
  })
}

function getClosestAsteroid(data) {
  const closest = data.sort((a, b) => {
    const missDistancesSortedForA = sortMissDistances(a.close_approach_data)
    const missDistancesSortedForB = sortMissDistances(b.close_approach_data)
    return (
      parseFloat(missDistancesSortedForA[0].miss_distance.lunar) -
      parseFloat(missDistancesSortedForB[0].miss_distance.lunar)
    )
  })
  return closest[0]
}

/** Sort given array with asteroid data by largest estimated km diameter
 *  and return the first from the list
 */
function getLargestAsteroid(data) {
  const sorted = data.sort(
    (a, b) =>
      a.estimated_diameter.estimated_diameter_max -
      b.estimated_diameter.estimated_diameter_max
  )
  return sorted[0]
}

/** Push all data from different dates to one array to help searching for
 *  largest asteroid.
 */
function createAsteroidsList(data) {
  const keys = Object.keys(data)
  const asteroidsList = keys.reduce((acc, key) => {
    const asteroidData = data[key]
    acc.push(...asteroidData)
    return acc
  }, [])
  return asteroidsList
}

/** Create date string used in api calls */
function createDateString(date) {
  if (date) {
    return date.toISOString().split('T')[0]
  }
  return null
}

/** Create array of dates between given dates */
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

/** Create api calls from array of dates. Chunks the date array
 *  in to chunks of 7 and use first and last date of the chunk as
 *  a start date and end date for api call to Nasa feed api. Returns a
 *  list of api urls.
 */
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

module.exports = {
  createAsteroidsList,
  getLargestAsteroid,
  createApiCalls,
  datesBetweenRange,
  createApiUrl,
  createDateString,
  getClosestAsteroid,
}

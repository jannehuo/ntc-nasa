const constants = require('../constants')
const axios = require('axios')
const helpers = require('../utils/helpers')
const cache = require('../utils/cache')

function handleResponseData(data) {
  /** List all asteroids from different dates under one array */
  const asteroidsList = helpers.createAsteroidsList(data)
  /** Search for largest astedoid based on estimated max size and return it */
  const largestAsteroid = helpers.getLargestAsteroid(asteroidsList)
  return largestAsteroid
}

function getData(url) {
  return axios
    .get(url)
    .then((response) => Promise.resolve(response))
    .catch((error) => Promise.reject(error))
}

function handleError(err, res) {
  console.log(err)
  if (err.response) {
    res.sendStatus(err.response.status)
  } else if (err.request) {
    res.sendStatus(500)
  } else {
    res.sendStatus(500)
  }
}

/** Fetch largest asteroid with given hardcoded date range. Before making the call
 *  check cache for data.
 */
function fetchLargestAsteroid(req, res) {
  const url = helpers.createApiUrl(constants.START_DATE, constants.END_DATE)
  const cacheKey = `${constants.START_DATE}-${constants.END_DATE}`
  const fromCache = cache.get(cacheKey)
  if (fromCache) {
    res.send(fromCache)
  } else {
    getData(url)
      .then((response) => {
        const responseData = handleResponseData(
          response.data.near_earth_objects
        )
        cache.set(cacheKey, responseData, constants.DEFAULT_TTL)
        res.send(responseData)
      })
      .catch((err) => {
        handleError(err, res)
      })
  }
}

/** Small delay function for making multiple api calls in row. Prevents nasa apis
 *  too many requests error.
 *  Default value is set in src/constants.js
 */
function delay(t) {
  return new Promise((resolve) => setTimeout(resolve, t))
}

/** Run through multiple api calls when searching for larges asteroid for one year.
 *  Make a small delay between calls and gather all the results in to on object.
 */
async function runApiCalls(promises) {
  let results = {}
  for (let promise of promises) {
    const res = await delay(constants.API_CALL_DELAY).then(() => promise)
    results = {
      ...results,
      ...res,
    }
  }
  return results
}

/** Check that year value is number and create list of api urls to call.
 *  After calls are finished return larges asteroid from the whole year.
 *  Before making the call check that if theres already asteroid data in cache
 *  from given year and return if it is found.
 */
async function fetchLargestAsteroidForYear(req, res) {
  const year = parseInt(req.params.year, 10)
  if (Number.isInteger(year)) {
    const fromCache = cache.get(year)
    if (fromCache) {
      res.send(fromCache)
    } else {
      const start = `${year}-01-01`
      const end = `${year}-12-31`
      let urls = helpers.createApiCalls(start, end)
      /** Make only 10 api calls when calling this in unit test */
      if (process.env.TEST) {
        urls = helpers.createApiCalls(start, end).slice(0, 5)
      }
      const promises = urls.map((url) =>
        axios
          .get(url)
          .then((res) => res.data.near_earth_objects)
          .catch((err) => handleError(err, res))
      )
      const results = await runApiCalls(promises)
      const responseData = handleResponseData(results)
      cache.set(year, responseData, constants.DEFAULT_TTL)
      res.send(responseData)
    }
  } else {
    res.sendStatus(400)
  }
}

module.exports = {
  fetchLargestAsteroid,
  fetchLargestAsteroidForYear,
}

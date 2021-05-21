const constants = require('../constants')
const axios = require('axios')
const helpers = require('../utils/helpers')

function handleResponseData(data) {
  const asteroidsList = helpers.createAsteroidsList(data)
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

function fetchLargestAsteroid(req, res) {
  const url = helpers.createApiUrl(constants.START_DATE, constants.END_DATE)
  getData(url)
    .then((response) => {
      res.send(handleResponseData(response.data.near_earth_objects))
    })
    .catch((err) => {
      handleError(err, res)
    })
}

function delay(t) {
  return new Promise((resolve) => setTimeout(resolve, t))
}

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

async function fetchLargestAsteroidForYear(req, res) {
  const year = parseInt(req.params.year, 10)
  if (Number.isInteger(year)) {
    const start = `${year}-01-01`
    const end = `${year}-12-31`
    const urls = helpers.createApiCalls(start, end).slice(0, 3)
    const promises = urls.map((url) =>
      axios.get(url).then((res) => res.data.near_earth_objects)
    )
    const results = await runApiCalls(promises)
    res.send(handleResponseData(results))
  } else {
    res.sendStatus(400)
  }
}

module.exports = {
  fetchLargestAsteroid,
  fetchLargestAsteroidForYear,
}

const constants = require('../constants')
const axios = require('axios')

function getData(url) {
  return axios
    .get(url)
    .then((response) => Promise.resolve(response))
    .catch((error) => Promise.reject(error));
}

function fetchAsteroidsData(req, res) {
  // https://api.nasa.gov/neo/rest/v1/feed?start_date=START_DATE&end_date=END_DATE&api_key=API_KEY
  const startDate = '2015-12-19'
  const endDate = '2015-12-26'
  const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${constants.API_KEY}`
  getData(url)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      if (err.response) {
        res.sendStatus(err.response.status);
      } else if (err.request) {
        res.sendStatus(500);
      } else {
        res.sendStatus(500);
      }
    })
}

module.exports = {
  fetchAsteroidsData
}
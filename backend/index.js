const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const data = require('./utils/data')

const app = express()
const PORT = 8000

app.use(bodyParser.json())
app.use(cors())

app.get('/largest', (req, res) => {
  data.fetchLargestAsteroid(req, res)
})

app.get('/largest/:year', (req, res) => {
  data.fetchLargestAsteroidForYear(req, res)
})

app.listen(PORT, () => {
  console.log(`Server is running at https://localhost:${PORT}`)
})

module.exports = app

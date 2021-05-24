const chai = require('chai')
const mocha = require('mocha')
const asteroids = require('./testData/astedoids')
const helpers = require('../utils/helpers')
const cache = require('../utils/cache')
const app = require('../index')
const chaiHttp = require('chai-http')
const constants = require('../constants')

chai.should()
chai.use(chaiHttp)

const TEST_TIMEOUT = 60000

describe('Test utility functions', () => {
  const astedoidsList = helpers.createAsteroidsList(asteroids)
  it('Should return array with 4 asteroids', () => {
    chai.expect(astedoidsList.length).to.equal(4)
  })
  it('Should return the larges asteroid from the list', () => {
    const largestAsteroid = helpers.getLargestAsteroid(astedoidsList)
    chai.expect(largestAsteroid.id).to.equal('2022099')
  })
  it('Should return dates between given range', () => {
    const dates = helpers.datesBetweenRange('2021-05-01', '2021-05-04')
    chai
      .expect(dates)
      .to.deep.equal(['2021-05-01', '2021-05-02', '2021-05-03', '2021-05-04'])
  })
  it('Should returns list of urls', () => {
    const urls = helpers.createApiCalls('2021-01-01', '2021-01-31')
    chai
      .expect(urls)
      .to.deep.equal([
        'https://api.nasa.gov/neo/rest/v1/feed?start_date=2021-01-01&end_date=2021-01-07&api_key=GYYVHEALmECqZp0eIQ6OFerSGO4grq98iwhyVH6O',
        'https://api.nasa.gov/neo/rest/v1/feed?start_date=2021-01-08&end_date=2021-01-14&api_key=GYYVHEALmECqZp0eIQ6OFerSGO4grq98iwhyVH6O',
        'https://api.nasa.gov/neo/rest/v1/feed?start_date=2021-01-15&end_date=2021-01-21&api_key=GYYVHEALmECqZp0eIQ6OFerSGO4grq98iwhyVH6O',
        'https://api.nasa.gov/neo/rest/v1/feed?start_date=2021-01-22&end_date=2021-01-28&api_key=GYYVHEALmECqZp0eIQ6OFerSGO4grq98iwhyVH6O',
        'https://api.nasa.gov/neo/rest/v1/feed?start_date=2021-01-29&end_date=2021-01-31&api_key=GYYVHEALmECqZp0eIQ6OFerSGO4grq98iwhyVH6O',
      ])
  })
  it('Should call api for largest asteroid and store it to cache', (done) => {
    chai
      .request(app)
      .get('/largest')
      .end((err, response) => {
        const status = response.status
        const cachedData = cache.get(
          `${constants.START_DATE}-${constants.END_DATE}`
        )
        chai.expect(status).to.equal(200)
        chai.expect(typeof cachedData).to.equal('object')
        done()
      })
  }).timeout(TEST_TIMEOUT)
  it('Should call api for largest asteroid for year and store it to cache', (done) => {
    process.env.TEST = true
    chai
      .request(app)
      .get('/largest/2015')
      .end((err, response) => {
        const status = response.status
        const cachedData = cache.get('2015')
        chai.expect(status).to.equal(200)
        chai.expect(typeof cachedData).to.equal('object')
        delete process.env.TEST
        done()
      })
  }).timeout(TEST_TIMEOUT)
})

const chai = require('chai')
const mocha = require('mocha')
const asteroids = require('./testData/astedoids')
const helpers = require('../utils/helpers')

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
        'https://api.nasa.gov/neo/rest/v1/feed?start_date=2021-01-01&end_date=2021-01-08&api_key=GYYVHEALmECqZp0eIQ6OFerSGO4grq98iwhyVH6O',
        'https://api.nasa.gov/neo/rest/v1/feed?start_date=2021-01-09&end_date=2021-01-16&api_key=GYYVHEALmECqZp0eIQ6OFerSGO4grq98iwhyVH6O',
        'https://api.nasa.gov/neo/rest/v1/feed?start_date=2021-01-17&end_date=2021-01-24&api_key=GYYVHEALmECqZp0eIQ6OFerSGO4grq98iwhyVH6O',
        'https://api.nasa.gov/neo/rest/v1/feed?start_date=2021-01-25&end_date=2021-01-31&api_key=GYYVHEALmECqZp0eIQ6OFerSGO4grq98iwhyVH6O',
      ])
  })
})

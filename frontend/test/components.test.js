import React from 'react'
import renderer from 'react-test-renderer'
import { HashRouter as Router } from 'react-router-dom'
import asteroidData from './mockData/astedoid'
import AsteroidData from '../src/components/AsteroidData'
import Loader from '../src/components/Loader'
import Notification from '../src/components/Notification'
import Nav from '../src/components/Nav'

describe('Test frontpage', () => {
  it('Should render asteroid data', () => {
    const component = renderer.create(<AsteroidData data={asteroidData} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('Should render loader', () => {
    const component = renderer.create(<Loader visible={true} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('Should render notification for status 503', () => {
    const data = {
      visible: true,
      status: 503,
    }
    const component = renderer.create(<Notification data={data} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('Should render notification for status 429', () => {
    const data = {
      visible: true,
      status: 429,
    }
    const component = renderer.create(<Notification data={data} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('Should render notification for status 500', () => {
    const data = {
      visible: true,
      status: 500,
    }
    const component = renderer.create(<Notification data={data} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('Should render navigation', () => {
    const component = renderer.create(
      <Router>
        <Nav />
      </Router>
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

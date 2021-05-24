import formatNumber from '../src/helpers/numbers'
import focusOnElement from '../src/helpers/dom'
import apiCall from '../src/helpers/api'

global.fetch = jest.fn(() => Promise.resolve({ foo: 'bar' }))

describe('Test helper functions', () => {
  const focusMock = jest.fn()

  it('Should format given number', () => {
    const num = formatNumber(12345.12345)
    expect(num).toBe('12345.12')
  })
  it('Should return empty string if no value is given', () => {
    const num = formatNumber()
    expect(num).toBe('')
  })
  it('Should return empty string if value is not a number', () => {
    const num = formatNumber('ABC')
    expect(num).toBe('')
  })
  it('Should focus on given element', () => {
    document.body.innerHTML = '<div id="TEST">TEST ELEMENT</div>'
    const el = document.getElementById('TEST')
    el.focus = focusMock
    focusOnElement('TEST')
    expect(el.focus).toHaveBeenCalledTimes(1)
  })
  it('Should call api', (done) => {
    const url = 'http://localhost:8000/largest'
    apiCall(url).then(() => {
      const spy = jest.spyOn(window, 'fetch')
      expect(spy).toHaveBeenCalledWith(url)
      done()
    })
  })
})

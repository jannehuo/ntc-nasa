import * as React from 'react'
import '../scss/components/asterdoidData.scss'

function AsteroidData() {
  return (
    <div className='asteroid-data-container'>
      <div className='asteroid-card'>
        <div className='asteroid-card-header'>
          <i class='fas fa-meteor' aria-hidden='true'></i>
          <div className='asteroid-card-header-size'>Estimated: 12 km</div>
        </div>
        <div className='asteroid-card-data'>
          <div className='asteroid-card-data-info'>
            <h2>YA-123</h2>
            <ul className='asteroid-card-data-info-list'>
              <li>
                <p className='asteroid-card-data-info-list-label'>Kilometers</p>
                <p className='asteroid-card-data-info-list-value'>12</p>
              </li>
              <li>
                <p className='asteroid-card-data-info-list-label'>Meters</p>
                <p className='asteroid-card-data-info-list-value'>12000</p>
              </li>
              <li>
                <p className='asteroid-card-data-info-list-label'>Speed</p>
                <p className='asteroid-card-data-info-list-value'>1200011</p>
              </li>
            </ul>
            <ul className='asteroid-card-data-info-approach-info-list'>
              <li>
                <p>Date</p>
                <p>10-10-2015</p>
              </li>
              <li>
                <p>Speed</p>
                <p>20000 km/h</p>
              </li>
              <li>
                <p>Distance</p>
                <p>14226161</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AsteroidData

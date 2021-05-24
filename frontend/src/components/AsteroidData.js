import * as React from 'react'
import { get } from 'lodash'
import formatNumber from '../helpers/numbers'
import '../scss/components/asterdoidData.scss'

function AsteroidData(props) {
  const { data } = props
  if (!data) {
    return null
  }
  const closeApproach = get(data, 'close_approach_data')
  return (
    <div className='asteroid-data-container'>
      <span className='sr-only'>Asteroid data ready</span>
      <div className='asteroid-card'>
        <div className='asteroid-card-header'>
          <i className='fas fa-meteor' aria-hidden='true'></i>
          <div className='asteroid-card-header-size'>
            Estimated:{' '}
            {formatNumber(
              get(
                data,
                'estimated_diameter.kilometers.estimated_diameter_max',
                ''
              )
            )}{' '}
            km
          </div>
        </div>
        <div className='asteroid-card-data'>
          <div className='asteroid-card-data-info'>
            <h2>{get(data, 'name')}</h2>
            <ul className='asteroid-card-data-info-list'>
              <li>
                <p className='asteroid-card-data-info-list-label'>Kilometers</p>
                <p className='asteroid-card-data-info-list-value'>
                  {formatNumber(
                    get(
                      data,
                      'estimated_diameter.kilometers.estimated_diameter_max',
                      ''
                    )
                  )}
                </p>
              </li>
              <li>
                <p className='asteroid-card-data-info-list-label'>Meters</p>
                <p className='asteroid-card-data-info-list-value'>
                  {formatNumber(
                    get(
                      data,
                      'estimated_diameter.meters.estimated_diameter_max',
                      ''
                    )
                  )}
                </p>
              </li>
              <li>
                <p className='asteroid-card-data-info-list-label'>Magnitude</p>
                <p className='asteroid-card-data-info-list-value'>
                  {formatNumber(get(data, 'absolute_magnitude_h', ''))}
                </p>
              </li>
            </ul>
            {closeApproach &&
              closeApproach.map((approachData, i) => (
                <ul
                  className='asteroid-card-data-info-approach-info-list'
                  key={i}
                >
                  <li>
                    <p>Date</p>
                    <p>{get(approachData, 'close_approach_date', '')}</p>
                  </li>
                  <li>
                    <p>Speed</p>
                    <p>
                      {formatNumber(
                        get(
                          approachData,
                          'relative_velocity.kilometers_per_hour'
                        )
                      )}{' '}
                      km/h
                    </p>
                  </li>
                  <li>
                    <p>Distance</p>
                    <p>
                      {formatNumber(
                        get(approachData, 'miss_distance.kilometers', '')
                      )}{' '}
                      km
                    </p>
                  </li>
                </ul>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AsteroidData

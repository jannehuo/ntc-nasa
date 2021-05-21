import * as React from 'react'
import { FRONTPAGE, YEAR } from '../paths'
import { Link } from 'react-router-dom'
import '../scss/components/nav.scss'

function Nav() {
  return (
    <div className='nav-container'>
      <h1 className='project-header'>
        <Link to={`${FRONTPAGE}`}>
          <i className='fas fa-globe' aria-hidden='true'></i>
          <span>NTC Nasa</span>
        </Link>
      </h1>
      <nav>
        <ul className='nav-links'>
          <li>
            <Link to={`${FRONTPAGE}`}>Frontpage</Link>
          </li>
          <li>
            <Link to={`${YEAR}`}>Find by year</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Nav

import * as React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Frontpage from './routes/Frontpage/frontpage'
import Year from './routes/Year/year'
import { FRONTPAGE, YEAR } from './paths'
import './scss/App.scss'

const App = () => {
  return (
    <Router>
      <header>
        <Nav />
      </header>
      <main>
        <div className='app-container'>
          <Switch>
            <Route path={`${YEAR}`}>
              <Year />
            </Route>
            <Route path={`${FRONTPAGE}`}>
              <Frontpage />
            </Route>
          </Switch>
        </div>
      </main>
    </Router>
  )
}

export default App

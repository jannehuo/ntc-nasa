import * as React from 'react'
import apiCall from '../../helpers/api'
import AsteroiData from '../../components/AsteroidData'

const url = 'http://localhost:8000/largest'

function Frontpage() {
  // React.useEffect(() => {
  //   apiCall(url).then((res) => console.log(res))
  // }, [])
  return (
    <React.Fragment>
      <h1>Largest asteroid</h1>
      <p>16-12-2015 - 22-12-2015</p>
      <AsteroiData />
    </React.Fragment>
  )
}

export default Frontpage

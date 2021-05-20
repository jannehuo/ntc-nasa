import * as React from "react";
import "./scss/App.scss";

const url = "http://localhost:8000/data";

const App = () => {
  React.useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result)
        },
        (e) => {
          console.log(e)
        }
      );
  }, []);
  return (
    <h1>JEEJEE</h1>
  )
};

export default App;

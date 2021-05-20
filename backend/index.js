const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const data = require('./utils/data')

const app = express();
const PORT = 8000;

app.use(bodyParser.json());
app.use(cors());

app.get("/data", (req, res) => {
  data.fetchAsteroidsData(req, res)
});

app.listen(PORT, () => {
  console.log(`Server is running at https://localhost:${PORT}`);
});

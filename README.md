# Ntc-nasa

## Overview

[NASA API](https://api.nasa.gov/)

Application calls **Asteroids - NeoWs** Api and uses **Neo - Feed** endpoint to fetch asteroid data.

### Endpoints

**localhost:8000/largest** Will fetch largest asteroid for harcoded dates between December 19th 2015 and December 26 2015

**localhost:8000/largest/YEAR** Will fetch largest asteroid for given year by making a list of calls to Nasa Feed Api. Es. **localhost:8000/largest/2015**

## Tech

Front end used [React](https://reactjs.org/) to display data from the backend. backend runs on Node js with [Express](https://expressjs.com/).

Unit tests are located under /test folder in both frontend and backend folders

## Run

**docker-compose up --build** to run on docker or run **npm run start** in both backend and frontend folders.

Frontend runs at **localhost:3000**
Backend runs at **localhost:8000**

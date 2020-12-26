import {Router} from 'express';
import base64 from 'base-64';
const FormData = require("form-data");
const fetch = require("node-fetch");

const route = Router();

export default (app) => {
  app.use('/authenticate', route);

  route.post('/', (req, res) => {
    const tokenUrl = 'https://www.warcraftlogs.com/oauth/token';

    let data = new FormData();
    data.append('grant_type', 'client_credentials');

    fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + base64.encode(process.env.REACT_APP_WL_ID+':'+process.env.REACT_APP_Wl_SECRET)
      },
      body: data
    })
    .then(response => response.json())
    .then(response => res.status(200).json(response))
    .catch(error => {
      res.status(400).json(error)
    });
  })
}
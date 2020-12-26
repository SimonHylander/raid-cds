import {Router} from 'express';
// import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
// import {setContext} from '@apollo/client/link/context';
import base64 from 'base-64';
import qs from 'querystring';
const FormData = require("form-data");
const fetch = require('node-fetch');

const route = Router();

export default (app) => {
  app.use('/report', route);
  route.get('/:code', (req, res) => {
    let { code } = req.params;

    const tokenUrl = 'https://www.warcraftlogs.com/oauth/token';

    /*let data = new FormData();
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
      });*/

    res.json({data: 'value'})

    /*;*/
  })
}
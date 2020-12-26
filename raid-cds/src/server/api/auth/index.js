import base64 from 'base-64';
const fetch = require("node-fetch");
const FormData = require("form-data");

export const getToken = () => {
  const tokenUrl = 'https://www.warcraftlogs.com/oauth/token';

  let data = new FormData();
  data.append('grant_type', 'client_credentials');

  return fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + base64.encode(process.env.REACT_APP_WL_ID + ':' + process.env.REACT_APP_Wl_SECRET)
    },
    body: data
  }).then(response => response.json())
}
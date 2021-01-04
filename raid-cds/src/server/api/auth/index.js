import base64 from 'base-64';
const fetch = require("node-fetch");
const FormData = require("form-data");

export const getToken = async () => {
  const tokenUrl = 'https://www.warcraftlogs.com/oauth/token';

  let data = new FormData();
  data.append('grant_type', 'client_credentials');

  return await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + base64.encode(process.env.RAZZLE_WL_ID + ':' + process.env.RAZZLE_Wl_SECRET)
    },
    body: data
  })
  .then(response => response.json())
}

const axios = require('axios');

export const authorize = () => {
  return axios.get(`https://www.warcraftlogs.com/oauth/authorize`, {
    auth: {
      username: process.env.REACT_APP_WL_ID,
      password: process.env.REACT_APP_Wl_SECRET,
    },
    params: {
      grant_type: 'client_credentials',
    }
  }).then(response => response)
}

export const getToken = () => {
  return axios.get(`https://www.warcraftlogs.com/oauth/token`, {
    auth: {
      username: process.env.REACT_APP_WL_ID,
      password: process.env.REACT_APP_Wl_SECRET,
    },
    params: {
      grant_type: 'client_credentials',
    }
  }).then(response => response)
}

//export * from './class.api';
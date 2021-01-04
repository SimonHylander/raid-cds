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
  return axios.post(`/api/authenticate`).then(response => response)
}

export const getFights = (code, fight) => {
  let url = `/api/reports/${code}`;

  if (fight) {
    url += `?fight=${fight}`;
  }

  return axios.get(url).then(response => response.data);
}

export const getEvents = async (code, startTime, endTime) => {
  let url = `/api/reports/${code}/events?startTime=${startTime}&endTime=${endTime}`;
  return await axios.get(url).then(response => response.data);
}

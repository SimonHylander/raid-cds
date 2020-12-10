const axios = require('axios');

const basePath = '/assets/img/instances';

const instanceIcons = new Map([
  [1190, `${basePath}/castle-nathria.jpg`],
]);

export const getRaids = (token, region, journalExpansionIndex) => {
  let locale = region === 'eu' ? 'en_GB' : 'en_US';
  let href = `https://${region}.api.blizzard.com/data/wow/journal-expansion/${journalExpansionIndex}?namespace=static-eu&locale=${locale}&access_token=${token.data.access_token}`;

  return axios.get(href, {
    headers: {
      Authorization: 'Bearer ' + token.data.access_token
    }
  })
  .then(response => response.data.raids.map(raid => {
    raid.icon = instanceIcons.has(raid.id) && instanceIcons.get(raid.id);
    return raid;
  }))
  .catch(err => err);
}

export const getInstance = (token, region, journalInstanceId) => {
  let locale = region === 'eu' ? 'en_GB' : 'en_US';
  let href = `https://${region}.api.blizzard.com/data/wow/journal-instance/${journalInstanceId}?namespace=static-eu&locale=${locale}&access_token=${token.data.access_token}`;

  return axios.get(href, {
    headers: {
      Authorization: 'Bearer ' + token.data.access_token
    }
  })
  .then(response => {
    response.data.encounters.forEach(e => {
      let name = e.name.toLowerCase()
        .replaceAll(' ', '-')
        .replaceAll(`'`, '');

      e.icon = `${basePath}/${name}.jpg`;
    })
    return response.data;
  })
  .catch(err => err);
}

export const getEncounter = (token, region, journalEncounterId) => {
  let href = `https://${region}.api.blizzard.com/data/wow/journal-encounter/${journalEncounterId}?namespace=static-eu&locale=en_US&access_token=${token.data.access_token}`;

  return axios.get(href, {
    headers: {
      Authorization: 'Bearer ' + token.data.access_token
    }
  }).then(response => response.data).catch(err => err);
}
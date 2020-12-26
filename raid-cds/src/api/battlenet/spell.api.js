const axios = require('axios');

const SpellIcons = new Map([
  [51052, '/assets/img/spell_deathknight_antimagiczone.jpg'],
  [196718, '/assets/img/ability_demonhunter_darkness.jpg'],
  [31821, '/assets/img/spell_holy_auramastery.jpg'],
  [97462, '/assets/img/ability_warrior_rallyingcry.jpg'],
  [740, '/assets/img/spell_nature_tranquility.jpg'],
  [115310, '/assets/img/spell_monk_revival.jpg'],
  [62618, '/assets/img/spell_holy_powerwordbarrier.jpg'],
  [108280, '/assets/img/ability_shaman_healingtide.jpg'],
  [98008, '/assets/img/spell_shaman_spiritlink.jpg'],
  [207399, '/assets/img/spell_nature_reincarnation.jpg'],
]);

export const getSpell = (token, region, spellId) => {
  let href = `https://${region}.api.blizzard.com/data/wow/spell/${spellId}?namespace=static-eu&locale=en_US&access_token=${token.data.access_token}`;

  return axios.get(href, {
    headers: {
      Authorization: 'Bearer ' + token.data.access_token
    }
  }).then(response => {

    if (SpellIcons.has(response.data.id)) {
      response.data.icon = SpellIcons.get(response.data.id);
    }

    if ([196718, 207399].indexOf(response.data.id) > -1) {
      response.data.cooldown = 300;
    }

    if ([108280, 98008, 31821, 31821, 62618, 740, 115310, 97462, 97462].indexOf(response.data.id) > -1) {
      response.data.cooldown = 180;
    }

    if ([51052].indexOf(response.data.id) > -1) {
      response.data.cooldown = 120;
    }

    return response.data
  }).catch(error => error)
}

export const getSpellMedia = (token, region, spellId) => {
  let href = `https://${region}.api.blizzard.com/data/wow/media/spell/${spellId}?namespace=static-eu&locale=en_US&access_token=${token.data.access_token}`;

  return axios.get(href, {
    headers: {
      Authorization: 'Bearer ' + token.data.access_token
    }
  }).then(response => response.data).catch(error => error)
}
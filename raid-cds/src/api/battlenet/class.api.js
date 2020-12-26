import {getSpell} from './spell.api.js';

const axios = require('axios');

const classAbilities = new Map([
  ['Death Knight', [51052]],
  ['Demon Hunter', [196718]],
  ['Paladin', [31821]],
  ['Warrior', [97462]],
]);

const specializationAbilities = new Map([
  [105, [740]], // Resto Druid
  [270, [115310]], // Mistweaver Monk
  [256, [62618]], // Disc Priest
  [257, []], // Holy Priest
  [264, [108280, 98008, 207399]], // Resto Shaman
]);

export const getClasses = (token, region) => {
  let classIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  let promises = [];

  classIds.forEach((classId) => {
    let href = `https://${region}.api.blizzard.com/data/wow/playable-class/${classId}?namespace=static-eu&locale=en_US&access_token=${token.data.access_token}`;

    promises.push(
      axios.get(href, {
        headers: {
          Authorization: 'Bearer ' + token.data.access_token
        }
      }).then(response => {
        response.data.icon = getClassIcon(response.data.id);
        response.data.abilities = [];

        let abilityPromises = [];

        if (classAbilities.has(response.data.name)) {
          classAbilities.get(response.data.name)
            .forEach(spellId =>
              abilityPromises.push(
                getSpell(token, region, spellId)
                  .then(spell => response.data.abilities.push(spell))
              ))
        }

        response.data.specializations.map(specialization => {
          specialization.amount = 0;
          specialization.icon = getSpecializationIcon(specialization.id);
          specialization.abilities = [];

          if (specializationAbilities.has(specialization.id)) {
            specializationAbilities.get(specialization.id)
              .forEach(spellId =>
                abilityPromises.push(
                  getSpell(token, region, spellId)
                    .then(spell => specialization.abilities.push(spell)))
              )
          }
        });

        return Promise.all(abilityPromises).then(() => response.data);
      }));
  });

  return Promise.all(promises);
}

export const getClassMedia = (token, region, classId) => {
  let href = `https://${region}.api.blizzard.com/data/wow/media/playable-class/${classId}?namespace=static-eu&locale=en_US&access_token=${token.data.access_token}`;

  return axios.get(href, {
    headers: {
      Authorization: 'Bearer ' + token.data.access_token
    }
  }).then(response => response.data).catch(error => error)
}

const getClassIcon = (classId) => {
  switch (classId) {
    case 1:
      return '/assets/img/classicon_warrior.jpg';
    case 2:
      return '/assets/img/classicon_paladin.jpg';
    case 3:
      return '/assets/img/classicon_hunter.jpg';
    case 4:
      return '/assets/img/classicon_rogue.jpg';
    case 5:
      return '/assets/img/classicon_priest.jpg';
    case 6:
      return '/assets/img/classicon_deathknight.jpg';
    case 7:
      return '/assets/img/classicon_shaman.jpg';
    case 8:
      return '/assets/img/classicon_mage.jpg';
    case 9:
      return '/assets/img/classicon_warlock.jpg';
    case 10:
      return '/assets/img/classicon_monk.jpg';
    case 11:
      return '/assets/img/classicon_druid.jpg';
    case 12:
      return '/assets/img/classicon_demonhunter.jpg';
  }
}

const getSpecializationIcon = (specializationId) => {
  switch (specializationId) {
    // DK
    case 250:
      return '/assets/img/spell_deathknight_bloodpresence.jpg';
    case 251:
      return '/assets/img/spell_deathknight_frostpresence.jpg';
    case 252:
      return '/assets/img/spell_deathknight_unholypresence.jpg';

    // DH
    case 577:
      return '/assets/img/demonhunter_havoc.jpg';
    case 581:
      return '/assets/img/demonhunter_vengeance.jpg';

    // Druid
    case 102:
      return '/assets/img/balance.jpg';
    case 103:
      return '/assets/img/feral.jpg';
    case 104:
      return '/assets/img/guardian.jpg';
    case 105:
      return '/assets/img/druid_resto.jpg';

    // Hunter
    case 253:
      return '/assets/img/hunter_beastmastery.jpg';
    case 254:
      return '/assets/img/hunter_marksman.jpg';
    case 255:
      return '/assets/img/hunter_survival.jpg';

    // Mage
    case 62:
      return '/assets/img/mage_arcane.jpg';
    case 63:
      return '/assets/img/mage_fire.jpg';
    case 64:
      return '/assets/img/mage_frost.jpg';

    // Monk
    case 268:
      return '/assets/img/monk_brewmaster.jpg';
    case 269:
      return '/assets/img/monk_windwalker.jpg';
    case 270:
      return '/assets/img/monk_mistweaver.jpg';

    // Paladin
    case 65:
      return '/assets/img/paladin_holy.jpg';
    case 66:
      return '/assets/img/paladin_protection.jpg';
    case 70:
      return '/assets/img/paladin_retribution.jpg';

    // Priest
    case 256:
      return '/assets/img/priest_discipline.jpg';
    case 257:
      return '/assets/img/priest_holy.jpg';
    case 258:
      return '/assets/img/priest_shadow.jpg';

    // Rogue
    case 259:
      return '/assets/img/rogue_assassination.jpg';
    case 260:
      return '/assets/img/rogue_outlaw.jpg';
    case 261:
      return '/assets/img/rogue_subtlety.jpg';

    // Shaman
    case 262:
      return '/assets/img/shaman_elemental.jpg';
    case 263:
      return '/assets/img/shaman_enhancement.jpg';
    case 264:
      return '/assets/img/shaman_restoration.jpg';

    // Warlock
    case 265:
      return '/assets/img/warlock_afflication.jpg';
    case 266:
      return '/assets/img/warlock_demonology.jpg';
    case 267:
      return '/assets/img/warlock_destruction.jpg';

    // Warrior
    case 71:
      return '/assets/img/warrior_arms.jpg';
    case 72:
      return '/assets/img/warrior_fury.jpg';
    case 73:
      return '/assets/img/warrior_protection.jpg';
  }
}
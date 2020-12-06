import React, {useState, useEffect} from 'react';
import {getClasses, getToken} from './api/battlenet'
import {useDispatch, useSelector} from 'react-redux'
import {setRoster, updateSpecialization} from './actions/roster.actions'

const Roster = () => {
  const dispatch = useDispatch();
  const classes = useSelector(state => state.roster.classes);

  console.log(classes);

  const loadClasses = async () => {
    let token = await getToken();
    getClasses(token, 'eu').then(classes => {
      dispatch(setRoster(classes));
    });
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

  const getSpecializationIcon = (classId) => {
    switch (classId) {
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

  const handleSpecializationClick = (e, specialization) => {
    if (e.nativeEvent.which === 1) {
      specialization.amount = specialization.amount + 1;
    }
    else if (e.nativeEvent.which === 3) {
      specialization.amount = specialization.amount - 1;
    }

    dispatch(updateSpecialization(specialization));
  }

  const specializationIcon = (specialization, key) => {
    return (
      <div className="specialization" key={key}>
        <img src={getSpecializationIcon(specialization.id)} width={30}
             title={specialization.name} onContextMenu={(e) => e.preventDefault()}
             onMouseUp={(e) => handleSpecializationClick(e, specialization)}
             style={{opacity: (specialization.amount > 0) ? 1 : 0.1}}/>

        {specialization.amount > 1 &&
          <div className="specialization-amount">{specialization.amount}</div>
        }
      </div>
    )
  }

  useEffect(() => {
    loadClasses();
  }, [])

  return (
    <div>

      <div className="form-group">
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Roster"/>

          <div className="input-group-append">
            <button className="btn btn-primary" type="button">Add</button>
          </div>
        </div>
      </div>

      <div className="form-group">
        {classes.length > 0 &&
        <table className="table class-table">
          <thead>
          <tr>
            <th>Class</th>
            <th>Specialization</th>
          </tr>
          </thead>
          <tbody>
          {classes.map((cls, i) => (
            <tr key={i}>
              <td>
                <img src={getClassIcon(cls.id)} width={30} style={{marginRight: 10}}/>
                <div className="class-name">
                  {cls.name}
                </div>
              </td>

              <td>
                {cls.specializations.map((specialization, i) => specializationIcon(specialization, i))}
              </td>
            </tr>
          ))}
          </tbody>
        </table>
        }
      </div>
    </div>
  )
}

export default Roster

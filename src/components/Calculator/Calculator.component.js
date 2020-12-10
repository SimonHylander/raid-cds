import React, {useState, useEffect, Fragment} from 'react'
import {PlusCircle} from 'react-feather'
import {useSelector} from 'react-redux'
import moment from 'moment'
import classNames from 'classnames';
import {Icon} from '../Icon/Icon.component.js'
import {Dropdown as RSDropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import {getRaids, getEncounter, getInstance} from '../../api/battlenet/journal.api.js';
import {getToken} from '../../api/battlenet';
import {Dropdown} from '../Dropdown';

export const Calculator = () => {
  const [raids, setRaids] = useState([]);
  const [encounters, setEncounters] = useState([]);
  const [selectedEncounter, setSelectedEncounter] = useState(null);

  const [timeText, setTimeText] = useState('');
  const [time, setTime] = useState([]);
  const [cooldowns, setCooldowns] = useState([]);

  const roster = useSelector(state => state.roster.classes);

  const nameSort = (a, b) => a.name.localeCompare(b.name);
  const nameSortDesc = (a, b) => b.name.localeCompare(a.name);

  const addTime = () => {
    if (!timeText || isNaN(parseInt(timeText))) {
      setTimeText('');
      return;
    }

    let lastDate = moment.max(time.map(t => t.date));

    if (timeText.indexOf(' ') > -1) {
      let spaceSplit = timeText.split(' ');

      if (spaceSplit.length === 2) {
        date.set({hour: 0, minute: parseInt(spaceSplit[0]), second: parseInt(spaceSplit[1]), millisecond: 0});
      }
    }
    else if (timeText.indexOf(':')) {
      let spaceSplit = timeText.split(' ');

      if (spaceSplit.length === 2) {
        date.set({hour: 0, minute: parseInt(spaceSplit[0]), second: parseInt(spaceSplit[1]), millisecond: 0});
      }
    }

    let date = moment();
    date.set({hour: 0, minute: 0, second: 0, millisecond: 0});

    if (date.isAfter(lastDate)) {
      setTime([...time, {
        date: date,
        time: date.format('mm:ss'),
        cooldowns: []
      }]);

      setTimeText('');
    }
  }

  const isToggleDisabled = (timestamp) => {
    return cooldowns.length === 0;
  }

  const toggleDropdown = (timestamp) => {
    if (cooldowns.length === 0) return;
    timestamp.isOpen = !timestamp.isOpen;
    setTime([...time]);
  }

  const isAllAssigned = (timestamp) => {
    let totalAssigned = cooldowns.filter(c => timestamp.cooldowns.filter(tc => tc.id === c.id).length === c.amount).length;
    return totalAssigned - cooldowns.length;
  };

  const remainingAmount = (timestamp, ability) => ability.amount - timestamp.cooldowns.filter(c => c.id === ability.id).length;

  const addAbility = (timestamp, ability) => {
    let assignedAmount = timestamp.cooldowns.filter(c => c.id === ability.id).length;

    if ((ability.amount - assignedAmount) > 0) {
      const {amount, ...cooldown} = ability;
      timestamp.cooldowns.push(cooldown);
      setTime([...time])
    }
  }

  const loadCooldowns = async () => {
    const activeRoster = roster.filter(classes => classes.specializations.some(specialization => specialization.amount > 0));
    let cooldowns = [];

    activeRoster.forEach(playableClass => {

      playableClass.abilities.forEach(ability => {
        ability.amount = 0;
        cooldowns.push(ability)
      });

      playableClass.specializations.forEach(specialization => {
        if (specialization.amount > 0) {

          playableClass.abilities.forEach(ability => {
            ability.amount++;
          });

          specialization.abilities.forEach(ability => {
            ability.amount = specialization.amount;
            cooldowns.push(ability)
          });
        }
      });
    });

    cooldowns.sort(nameSort);
    setCooldowns(cooldowns);
  }

  const loadRaids = async () => {
    let token = await getToken();
    getRaids(token, 'eu', 499)
      .then(raids => setRaids(raids));
  }

  const handleRaidChange = async (raid) => {
    let token = await getToken();
    getInstance(token, 'eu', raid.id)
      .then(instance => setEncounters(instance.encounters))
      .catch(() => setEncounters([]));
  }

  const handleEncounterChange = async (encounter) => {
    let token = await getToken();
    getEncounter(token, 'eu', encounter.id)
      .then(encounter => setSelectedEncounter(encounter));
  }

  useEffect(() => {
    loadRaids();
  }, [])

  useEffect(() => console.log(selectedEncounter), [selectedEncounter])

  useEffect(() => {
    loadCooldowns();

    let timestamps = [
      {
        minute: 0,
        second: 17
      },
      {
        minute: 0,
        second: 50
      },
      {
        minute: 1,
        second: 25
      },
      {
        minute: 2,
        second: 43
      },
      {
        minute: 3,
        second: 16
      },
      {
        minute: 3,
        second: 53
      },
      {
        minute: 5,
        second: 7
      },
      {
        minute: 5,
        second: 41
      },
      {
        minute: 6,
        second: 12
      }
    ];

    let time = [];

    timestamps.forEach(timestamp => {
      let date = moment();
      date.set({hour: 0, minute: timestamp.minute, second: timestamp.second, millisecond: 0});

      time.push({
        date: date,
        time: date.format('mm:ss'),
        cooldowns: []
      });
    });

    setTime(time);

  }, [roster]);

  return (
    <div className="row justify-content-center align-items-center h-100">
      <form>
        <div className="form-group">
          <Dropdown options={raids} placeholder="Choose Raid" onChange={handleRaidChange}/>
        </div>

        { encounters.length > 0 &&
          <div className="form-group">
            <Dropdown options={encounters} placeholder="Choose Encounter" onChange={handleEncounterChange}/>
          </div>
        }

        <div className="form-group">
          <div className="input-group mb-3">
            <input type="text"
                   className="form-control"
                   placeholder="Enter timestamp"
                   value={timeText}
                   onChange={(e) => setTimeText(e.target.value)}/>

            <div className="input-group-append">
              <button className="btn btn-primary" type="button" onClick={addTime}>Add</button>
            </div>
          </div>
        </div>

        {/*Fight duration*/}

        {/*<div className="form-group">
            <div className="input-group mb-3">
              <button className="btn btn-primary" type="button">
                <FilePlus size={20}/> Load from log
              </button>
            </div>
          </div>*/}

        <div className="form-group">
          <div className="container">
            <div className="row">
              <div className="col">
                <button type="button" className="btn btn-secondary btn-sm float-left"
                        onClick={() => setTime([])}>
                  Reset
                </button>
              </div>
              <div className="col">
                <button type="button" className="btn btn-primary btn-sm float-right">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </form>

      {time.length > 0 &&
      <table className="table calculator-table">
        <thead>
        <tr>
          <th>Time</th>
          <th width={200}>Cooldown</th>
        </tr>
        </thead>
        <tbody>
        {time.map((timestamp, i) => (
          <tr key={i}>
            <td>{timestamp.time}</td>

            <td>
              <div className="d-flex flex-row-reverse">
                <RSDropdown isOpen={timestamp.isOpen} toggle={() => toggleDropdown(timestamp)}>
                  <DropdownToggle
                    tag="div"
                    className={classNames({toggle: true, disabled: isToggleDisabled(timestamp)})}
                    title="Assign">
                    <PlusCircle size={20} color="white"/>
                  </DropdownToggle>

                  <DropdownMenu>
                    {isAllAssigned(timestamp) === 0 && <DropdownItem tag="div">No abilities available</DropdownItem>}

                    {cooldowns.map((ability, i) => {
                      if (ability.amount === 0 || remainingAmount(timestamp, ability) === 0) return <Fragment key={i}/>;

                      return (
                        <a className="dropdown-item" href="#" key={i} onClick={() => addAbility(timestamp, ability)}>
                          <Icon src={ability.icon} width={20} title={ability.name}/>
                          <span>{ability.name} {ability.amount > 1 && `x${ability.amount}`}</span>
                        </a>
                      )
                    })}
                  </DropdownMenu>
                </RSDropdown>

                {timestamp.cooldowns.sort(nameSortDesc)
                  .map((ability, i) =>
                    <Icon src={ability.icon} width={20} title={ability.name} key={i}/>)}
              </div>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      }
    </div>
  )
}
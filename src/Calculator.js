import React, {useState, useEffect} from 'react'
import {PlusCircle} from 'react-feather'
import {useSelector} from 'react-redux'
import moment from 'moment'
import {Icon} from './components/Icon/Icon.component.js'

const Calculator = () => {
  const [timestamp, setTimestamp] = useState('');
  const [time, setTime] = useState([]);
  const [cooldowns, setCooldowns] = useState([]);

  const roster = useSelector(state => state.roster.classes);

  const addTimestamp = (e) => {
    if (!timestamp)
      return;

    setTimestamp('');
    setTime([...time, timestamp]);
  }

  const loadCooldowns = async () => {
    const activeRoster = roster.filter(classes => classes.specializations.some(specialization => specialization.amount > 0));
    let cooldowns = [];

    activeRoster.forEach(playableClass => {
      playableClass.specializations.forEach(specialization => {
        if (specialization.amount > 0) {

          playableClass.abilities.forEach(ability => {
            ability.amount = specialization.amount;
            cooldowns.push(ability)
          });

          specialization.abilities.forEach(ability => {
            ability.amount = specialization.amount;
            cooldowns.push(ability)
          });
        }
      });
    });

    setCooldowns(cooldowns);
  }

  const addAbility = (timestamp, ability) => {
    timestamp.cooldowns.push(ability);

    setTime([...time])
  }

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
          <div className="input-group mb-3">
            <input type="text"
                   className="form-control"
                   placeholder="Enter timestamp"
                   value={timestamp}
                   onChange={(e) => setTimestamp(e.target.value)}/>

            <div className="input-group-append">
              <button className="btn btn-primary" type="button" onClick={addTimestamp}>Add</button>
            </div>
          </div>
        </div>

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
      <table className="table">
        <thead>
        <tr>
          <th>Time</th>
          <th>Cooldown</th>
        </tr>
        </thead>
        <tbody>
        {time.map((timestamp, i) => (
          <tr key={i}>
            <td>{timestamp.time}</td>

            <td>
              {timestamp.cooldowns.map((ability, i) =>
                <span key={i}><Icon src={ability.icon} width={20}/></span>
              )}

              <div className="dropdown">
                <PlusCircle size={20}
                            color="white"
                            title="Assign"
                            data-toggle="dropdown"
                            style={{cursor: 'pointer'}}
                />

                <div className="dropdown-menu">
                  {cooldowns.map((ability, i) => (
                    <a className="dropdown-item" href="#" key={i} onClick={() => addAbility(timestamp, ability)}>
                      <Icon src={ability.icon} width={20} title={ability.name}/>
                      <span>{ability.name} {ability.amount > 1 && `x${ability.amount}`}</span>
                    </a>
                  ))}
                </div>
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

export default Calculator;

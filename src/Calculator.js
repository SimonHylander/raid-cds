import React, {useState, useEffect} from 'react'
import {PlusCircle} from 'react-feather'
import {useSelector} from 'react-redux'
import moment from 'moment'
import {Icon} from './components/Icon/Icon.component.js'

const Calculator = () => {
  const [timestamp, setTimestamp] = useState('');
  const [timestamps, setTimestamps] = useState([]);
  const [cooldowns, setCooldowns] = useState([]);

  const roster = useSelector(state => state.roster.classes);

  const addTimestamp = (e) => {
    if (!timestamp)
      return;

    setTimestamp('');
    setTimestamps([...timestamps, timestamp]);
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

  useEffect(() => {
    loadCooldowns();

    let t = [
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

    let dates = [];

    t.forEach(timestamps => {
      let date = moment();
      date.set({hour: 0, minute: timestamps.minute, second: timestamps.second, millisecond: 0});
      dates.push(date.format('mm:ss'));
    });

    setTimestamps(dates);

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
                <button type="button" className="col-6 btn btn-secondary btn-sm float-left"
                        onClick={() => setTimestamps([])}>
                  Reset
                </button>
              </div>
              <div className="col">
                <button type="button" className="col-6 btn btn-primary btn-sm float-right">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </form>

      {timestamps.length > 0 &&
      <table className="table">
        <thead>
        <tr>
          <th>Time</th>
          <th>Cooldown</th>
        </tr>
        </thead>
        <tbody>
        {timestamps.map((timestamp, i) => (
          <tr key={i}>
            <td>{timestamp}</td>
            <td>
              <div className="dropdown">
                <PlusCircle size={20} color="white" style={{cursor: 'pointer'}} title="Assign"
                            data-toggle="dropdown" aria-haspopup="true"/>

                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  {cooldowns.map((cooldown, i) => (
                    <a className="dropdown-item" href="#" key={i}>
                      <Icon src={cooldown.icon} width={20} title={cooldown.name}/>
                      <span>{cooldown.name} {cooldown.amount > 1 && `x${cooldown.amount}`}</span>
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
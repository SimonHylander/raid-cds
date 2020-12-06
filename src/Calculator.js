import React, {useState, useEffect} from 'react';
import {PlusCircle, FilePlus} from 'react-feather';
import {getSpell, getToken} from './api/battlenet'

const Calculator = () => {
  const [timestamp, setTimestamp] = useState('');
  const [timestamps, setTimestamps] = useState([]);
  const [cooldowns, setCooldowns] = useState([]);

  const addTimestamp = (e) => {
    if (!timestamp)
      return;

    setTimestamp('');
    setTimestamps([...timestamps, timestamp]);
  }

  const loadCooldowns = async () => {
    let token = await getToken();

    let spellMap = new Map([
      ['Healing Tide', 108280],
      ['Spirit Link', 98008],
      ['Aura Mastery', 31821],
      ['PW: Barrier', 62618],
      ['Tranquility', 740],
      ['Revival', 115310],
      ['Rallying Cry', 97462],
      ['Anti-Magic Zone', 51052],
      ['Darkness', 196718],
      ['Ancestral Protection Totem', 207399]
    ]);

    console.log(spellMap.entries());

    let spells = [];
    let promises = [];

    for (let [spell, spellId] of spellMap.entries()) {
      promises.push(getSpell(token, 'eu', spellId));
    }

    Promise.all(promises)
      .then((spells) => {
        spells.forEach((spell) => {
          //spell.id === spellMap.get('Healing Tide')
          if ([196718, 207399].indexOf(spell.id) > -1) {
            spell.cooldown = 300;
          }

          if ([108280, 98008, 31821, 31821, 62618, 740, 115310, 97462, 97462].indexOf(spell.id) > -1) {
            spell.cooldown = 180;
          }

          if ([51052].indexOf(spell.id) > -1) {
            spell.cooldown = 120;
          }
        })

        setCooldowns(spells);
      });
  }


  useEffect(() => {
    loadCooldowns();

    setTimestamps([
      '0:17',
      '0:50',
      '01:25',
      '02:43',
      '03:16',
      '03:53',
      '05:07',
      '05:41',
      '06:12',
    ]);
  }, []);

  return (
    <div className="row justify-content-center align-items-center h-100">
      <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3">
        <form action="">
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
                {/*<PlusCircle size={20} color="white" style={{cursor: 'pointer'}} title="Assign"/>*/}

                <div className="dropdown">
                  {/*<button className="btn btn-primary btn-xs dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Assign
                    </button>*/}

                  <PlusCircle size={20} color="white" style={{cursor: 'pointer'}} title="Assign"
                              data-toggle="dropdown" aria-haspopup="true"/>

                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {cooldowns.map((cooldown, i) => (
                      <a className="dropdown-item" href="#" key={i}>{cooldown.name}</a>
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
    </div>
  )
}

export default Calculator;

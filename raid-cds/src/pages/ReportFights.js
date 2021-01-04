import React, {useState, useEffect} from 'react';
import {getFights} from '../api/warcraftlogs';
import styled from 'styled-components';
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {setReport} from '../actions/Report.actions'

export const ReportFights = (props) => {
  const dispatch = useDispatch();
  const report = useSelector(state => state.report);

  const [encounters, setEncounters] = useState([]);

  const {
    code,
  } = props.match.params;

  useEffect(() => {
    getFights(code).then(response => dispatch(setReport(response)));
  }, [])

  useEffect(() => {
    if (report) {
      let encounters = [];
      let map = new Map();

      report.fights.forEach(fight => {
        let millis = fight.endTime - fight.startTime;
        let minutes = Math.floor((millis / 1000) / 60);
        let seconds = Math.floor((millis / 1000) % 60);

        if (seconds < 9) seconds = "0" + seconds;

        fight.time = minutes + ':' + seconds;

        switch (fight.difficulty) {
          case 1:
            fight.difficultyName = 'LFR';
            break;
          case 3:
            fight.difficultyName = 'Normal';
            break;
          case 4:
            fight.difficultyName = 'Heroic';
            break;
          case 5:
            fight.difficultyName = 'Mythic';
            break;
        }

        let fightName = fight.difficultyName + ' ' + fight.name;

        if (map.has(fightName)) {
          map.get(fightName).push(fight);
        }
        else {
          map.set(fightName, [fight]);
        }
      });

      for (const [key, value] of (Array.from(map.entries()))) {
        encounters.push({
          name: key,
          fights: value
        });
      }

      setEncounters(encounters);
    }
  }, [report]);

  return (
    <div className="page-container">
      <div className="container-fluid">
        <div className="main">
          <div className="row mb-4">
            <div className="col">
              <div className="card" style={{background: '#1d1c1b'}}>
                {encounters.map((encounter, i) => (
                  <div className="flex p-4" key={i}>
                    <h2>{encounter.name}</h2>

                    <Pulls style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))'}}>
                      {encounter.fights.map((fight, i) => (
                        <Pull to={`/reports/${code}/${fight.id}-${encounter.name.replaceAll(' ', '-')}`} key={i} style={{ color: fight.kill ? '#66E566' : '#E57F00' }}>
                          {fight.kill ? 'Kill' : 'Wipe'} {fight.time} {!fight.kill && ` (${Math.floor(fight.fightPercentage)}%)`}
                        </Pull>
                      ))}
                    </Pulls>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportFights;

const Encounter = styled.div`
  

`;

const Pulls = styled.div`

`;

const Pull = styled(Link)`
  margin: .25rem!important;
  padding: 7px 10px;
  background: #2F2E2D;
  cursor: pointer;
`;



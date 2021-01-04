import React, {useState, useEffect} from 'react';
import {getFights} from '../../api/warcraftlogs';

import {ChevronRight} from 'react-feather';
import {Link, useHistory} from 'react-router-dom'

export const ReportLoader = () => {
  const history = useHistory();

  const [report, setReport] = useState('https://www.warcraftlogs.com/reports/v4k9A8PgNR2C6FDT');
  // const [report, setReport] = useState('https://www.warcraftlogs.com/reports/yNFPmwAb2zTka9hp');

  const [reportData, setReportData] = useState(null);
  const [fights, setFights] = useState([]);

  const [activeFight, setActiveFight] = useState(null);

  const analyzeReport = () => {
    let codeMatch = report.match(/(?<=\/reports\/).{16}/);
    let fightMatch = report.match(/fight=([^&]*)/);

    let reportCode = codeMatch ? codeMatch[0] : null;
    let fight = fightMatch ? fightMatch[1] : null;

    history.push(`/reports/${reportCode}`);

    /*getFights(reportCode, fight)
      .then(response => {
        let fights = [];

        if (response.data) {
          response.data.reportData.report.fights.forEach(fight => {
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

            fights.push(fight);
          });

          console.log(fights);
          setFights(fights);
          setReportData(response.data.reportData);
        }
      });*/
  }

  useEffect(() => {
    console.log(reportData);
  }, [reportData])

  return (
    <React.Fragment>
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group mb-3">
            <input type="text"
                   className="form-control"
                   placeholder="https://www.warcraft.logs.com/reports/<code>"
                   value={report}
                   onChange={(e) => setReport(e.target.value)}/>

            <div className="input-group-append">
              <button className="btn btn-primary" type="button" onClick={analyzeReport}>Analyze</button>
            </div>
          </div>
        </div>
      </div>

      { !activeFight && (fights && fights.length > 0) &&
        <div className="row mb-4">
          <div className="col">
            <div className="card" style={{background: '#1d1c1b'}}>
              <table className="table">
                <tbody>
                {fights.map((fight, i) => (
                  <tr key={i} onClick={() => setActiveFight(fight)}>
                    <td style={{paddingLeft: '1.5rem'}}>{fight.difficultyName} <strong>{fight.name}</strong></td>

                    <td style={{color: fight.kill ? '#66E566' : '#E57F00'}}>
                      {fight.time}
                      {!fight.kill && ` - ${Math.floor(fight.fightPercentage)}%`}
                    </td>

                    { reportData &&
                      <td>
                        <Link to={`/reports/${reportData.report.code}`}>
                          <ChevronRight size={20} strokeWidth={3}/>
                        </Link>
                      </td>
                    }
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      }

      { activeFight &&
        <div>
          <h3>{activeFight.difficultyName}</h3>
          <h2>{activeFight.name}</h2>

          go to new page to
          server render events
        </div>
      }

    </React.Fragment>
  )
}

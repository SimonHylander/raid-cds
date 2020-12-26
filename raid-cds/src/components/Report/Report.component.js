import React, {useState, useEffect} from 'react';
import {getFights, getToken} from '../../api/warcraftlogs';

export const Report = () => {
  const [report, setReport] = useState('https://www.warcraftlogs.com/reports/v4k9A8PgNR2C6FDT');

  const analyzeReport = () => {
    console.log('analyzeReport');
    console.log(report);

    let reportCode = report.substr(report.lastIndexOf('/')+1);

    getFights(reportCode)
      .then(r => console.log(r));
  }

  useEffect(() => {

  }, [])

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
    </React.Fragment>
  )
}
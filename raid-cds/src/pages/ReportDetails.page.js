import React, {useState, useEffect} from 'react';
import {getEvents, getFights} from '../api/warcraftlogs';
import styled from 'styled-components';
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import moment from 'moment'
import {CartesianGrid, Line, LineChart, Tooltip, XAxis} from 'recharts'

import {setReport} from '../actions/Report.actions'

export const ReportDetails = (props) => {
  const dispatch = useDispatch();

  const report = useSelector(state => state.report);

  const [seconds, setSeconds] = useState([]);
  const [graphData, setGraphData] = useState([]);

  const {
    code,
    fight
  } = props.match.params

  useEffect(() => {
    getFights(code).then(response => dispatch(setReport(response)));
  }, [])

  useEffect(async () => {
    let fightId = fight.match(/[^;]/) ? parseInt(fight.match(/.+?(?=-)/)[0]) : null;

    if (report && fightId) {
      let fight = report.fights.find(f => f.id === fightId);
      const eventReport = await getEvents(code, fight.startTime, fight.endTime)

      let millis = eventReport.graph.data.endTime - eventReport.graph.data.startTime;
      let graphData = [];

      eventReport.graph.data.series.forEach(s => {
        if (s.name === 'Concentrated Anima') {
          // graphData.push(s);
          //graphData = s.data;
          console.log(s);
          let interval = millis / s.pointInterval;
          console.log(interval);
          for (let i = 0; i < interval; i++) {
            graphData.push({
              time: i
            });
          }
        }
      });

      setGraphData(graphData);
    }
  }, [report])

  useEffect(() => {
    console.log(graphData);
  }, [graphData])

  return (
    <div className="page-container">
      <div className="container-fluid">
        <div className="main">
          <div className="row mb-4">
            <div className="col">
              <div className="card" style={{background: '#1d1c1b'}}>
                {/*<LineChart
                  width={400}
                  height={400}
                  data={graphData}
                  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                  <XAxis dataKey="time" />
                  <Tooltip />
                  <CartesianGrid stroke="#f5f5f5" />
                  <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />
                  <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
                </LineChart>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportDetails;

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



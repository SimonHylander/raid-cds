import React, {useState} from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import ReportFights from './pages/ReportFights'
import ReportDetails from './pages/ReportDetails.page'
import {Tab, Tabs} from './components/Tab'
import {Roster} from './components/Roster'
import {Calculator} from './components/Calculator'
import './App.css';

const App = () => {
  const [activeTab] = useState('roster');

  return (
    <React.Fragment>
      <div className="page-container">
        <div className="container-fluid">
          <div className="main">

            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/reports/:code/:fight" component={ReportDetails} />
              <Route exact path="/reports/:code" component={ReportFights} />
            </Switch>

            <Tabs activeKey={activeTab}>
              <Tab tabKey="roster" title="Roster">
                <Roster/>
              </Tab>

              <Tab tabKey="calculator" title="Calculator">
                <Calculator/>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;

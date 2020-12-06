import React, {useState, useEffect} from 'react';
import './App.css';
import {Tabs} from './components/Tab/Tabs'
import {Tab} from './components/Tab/Tab'
import Roster from './Roster'
import Calculator from './Calculator'

const App = () => {
  const [activeTab, setActiveTab] = useState('roster');

  return (
    <div className="page-container">
      <div className="container-fluid">
        <div className="main">
          <h1>Raid Cooldown Calculator</h1>

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
  );
}

export default App;

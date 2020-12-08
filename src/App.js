import React, {useState} from 'react'
import './App.css'
import {Tabs} from './components/Tab'
import {Tab} from './components/Tab'
import {Roster} from './components/Roster/'
import {Calculator} from './components/Calculator/'

const App = () => {
  const [activeTab] = useState('roster');

  return (
    <div className="page-container">
      <div className="container-fluid">
        <div className="main">
          {/*<h1>Raid Cooldown Calculator</h1>*/}

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
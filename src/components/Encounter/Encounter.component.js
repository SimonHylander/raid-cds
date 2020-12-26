import React, {useState, useEffect} from 'react';
import {Button} from 'reactstrap';

export const Encounter = ({encounter}) => {
  console.log(encounter);

  const [selectedMode, setSelectedMode] = useState(null);

  const handleModeClick = (mode) => {
    setSelectedMode(mode);
  }

  useEffect(() => {
    let normalMode = encounter.modes.find(mode => mode.type === 'NORMAL');

    if (normalMode) {
      setSelectedMode(normalMode);
    }
  }, [])

  return (
    <React.Fragment>
      <div className="d-flex d-flex-column mb-4">
        {encounter.modes.map((mode, i) =>
          <Button color={selectedMode && mode.name === selectedMode.name ? 'info' : 'secondary'} key={i} onClick={() => handleModeClick(mode)}>
            {mode.name}
          </Button>
        )}
      </div>

      <div className="mb-4">
        {encounter.sections.map((section, i) => {
          if (section.title === 'Overview') return <React.Fragment/>

          return (
            <div key={i}>
              <div className="text-info">{section.title}</div>

              { section.sections &&
                <ul>
                  {section.sections.map((s, i) => <li key={i}>{s.title}</li>)}
                </ul>
              }
            </div>
          )
        })}
      </div>
    </React.Fragment>
  )
}
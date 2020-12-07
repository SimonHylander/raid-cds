import React, {useEffect} from 'react'
import {getClasses, getToken} from './api/battlenet/'
import {useDispatch, useSelector} from 'react-redux'
import {setRoster, updateSpecialization} from './actions/roster.actions'
import {Icon} from './components/Icon/Icon.component.js';

const Roster = () => {
  const dispatch = useDispatch();
  const classes = useSelector(state => state.roster.classes);

  const loadClasses = async () => {
    let token = await getToken();
    getClasses(token, 'eu').then(classes => {
      dispatch(setRoster(classes));
    });
  }

  const handleSpecializationClick = (e, specialization) => {
    if (e.nativeEvent.which === 1) {
      specialization.amount = specialization.amount + 1;
    }
    else if (e.nativeEvent.which === 3) {
      specialization.amount = specialization.amount - 1;
    }

    dispatch(updateSpecialization(specialization));
  }

  const specializationIcon = (specialization, key) => {
    return (
      <div className="specialization" key={key}>
        <Icon src={specialization.icon} width={30} title={specialization.name} onContextMenu={(e) => e.preventDefault()}
             onMouseUp={(e) => handleSpecializationClick(e, specialization)}
             style={{opacity: (specialization.amount > 0) ? 1 : 0.1}}/>

        {specialization.amount > 1 &&
          <div className="specialization-amount">{specialization.amount}</div>
        }
      </div>
    )
  }

  useEffect(() => {
    loadClasses();
  }, [])

  return (
    <div>
      <div className="form-group">
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Roster"/>

          <div className="input-group-append">
            <button className="btn btn-primary" type="button">Add</button>
          </div>
        </div>
      </div>

      <div className="form-group">
        {classes.length > 0 &&
        <table className="table class-table">
          <thead>
          <tr>
            <th>Class</th>
            <th>Specialization</th>
          </tr>
          </thead>
          <tbody>
          {classes
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((playableClass, i) => (
            <tr key={i}>
              <td>
                <Icon src={playableClass.icon} width={30} title={playableClass.name}/>
                <div className="class-name">
                  {playableClass.name}
                </div>
              </td>

              <td>
                {playableClass.specializations.map((specialization, i) => specializationIcon(specialization, i))}
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

export default Roster
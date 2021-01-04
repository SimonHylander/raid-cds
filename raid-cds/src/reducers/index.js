import {combineReducers} from 'redux';
import Report from './Report.reducer';
import Roster from './roster.reducer';

const rootReducer = combineReducers({
  report: Report,
  roster: Roster,
});

export default rootReducer;

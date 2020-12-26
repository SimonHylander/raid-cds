import {combineReducers} from 'redux';
import Roster from './roster.reducer';

const rootReducer = combineReducers({
  roster: Roster,
});

export default rootReducer;

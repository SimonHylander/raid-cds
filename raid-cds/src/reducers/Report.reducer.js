import {
  SET_REPORT
} from '../types/Report.types';

const initialState = null;

const Roster = (state = initialState, action) => {

  switch (action.type) {

    case SET_REPORT:
      return action.report;;

    default:
      return state;
  }
};

export default Roster;

import {
  SET_ROSTER,
  UPDATE_SPECIALIZATION
} from '../types/roster.types';

const initialState = {
  classes: []
};

const Roster = (state = initialState, action) => {

  switch (action.type) {

    case SET_ROSTER: {
      var classes = [];

      action.classes.forEach(playableClass => {
        playableClass.specializations.map(specialization => specialization.amount = 0);
        classes.push(playableClass);
      });

      state.classes = classes;

      return state;
    }

    case UPDATE_SPECIALIZATION: {
      let classes = [];

      [...state.classes].forEach(playableClass => {
        for (let i = 0; i < playableClass.specializations.length; i++) {
          if (playableClass.specializations[i].id === action.specialization.id) {
            playableClass.specializations[i] = action.specialization;
          }
        }

        classes.push(playableClass);
      });

      state.classes = classes;

      return state;
    }

    default:
      return state;
  }
};

export default Roster;
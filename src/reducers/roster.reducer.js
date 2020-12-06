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

      action.classes.forEach(cls => {
        cls.specializations.map(specialization => specialization.amount = 0);
        classes.push(cls);
      });

      state.classes = classes;

      return state;
    }

    case UPDATE_SPECIALIZATION: {
      let classes = [];

      [...state.classes].forEach(cls => {
        for (let i = 0; i < cls.specializations.length; i++) {
          if (cls.specializations[i].id === action.specialization.id) {
            cls.specializations[i] = action.specialization;
          }
        }

        classes.push(cls);
      });

      state.classes = classes;

      return state;
    }

    default:
      return state;
  }
};

export default Roster;

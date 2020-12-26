import {
  SET_ROSTER,
  UPDATE_SPECIALIZATION
} from '../types/roster.types';

export function setRoster(classes) {
  return (dispatch) => {
    dispatch({ type: SET_ROSTER, classes });
  };
}

export function updateSpecialization(specialization) {
  return (dispatch) => dispatch({ type: UPDATE_SPECIALIZATION, specialization });
}
import {
  SET_REPORT
} from '../types/Report.types';

export function setReport(report) {
  return (dispatch) => {
    dispatch({ type: SET_REPORT, report });
  };
}

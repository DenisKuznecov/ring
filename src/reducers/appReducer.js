import * as TYPES from '../types/appTypes';
import * as helpers from './appReducerHelpers';
import _ from 'lodash';

const dataFromLs = JSON.parse(localStorage.getItem('data'));

/** 
 * if there is data saved in localstorage than take it
 * otherwise create initial state
*/
const initialState = !_.isNil(dataFromLs) ? dataFromLs : {
  columns: [],
};

export const appReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TYPES.ADD_COLUMN:
      return helpers.addColumn(state, payload);
    case TYPES.DELETE_COLUMN:
      return helpers.deleteColumn(state, payload);;
    case TYPES.ADD_TICKET:
      return helpers.addTicket(state, payload);
    case TYPES.DELETE_TICKET:
      return helpers.deleteTicket(state, payload);
    case TYPES.UPDATE_COLUMNS:
      return helpers.updateColumns(state, payload);
    default:
      return state;
  }
}

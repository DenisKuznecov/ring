import * as TYPES from '../types/appTypes';
import * as helpers from './appReducerHelpers';

const initialState = {
  columns: [],
};

export const appReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TYPES.ADD_COLUMN:
      return {
        ...state,
        columns: [ ...state.columns, payload ],
      };
    case TYPES.DELETE_COLUMN:
      return {
        ...state,
        columns: state.columns.filter(column => column.id !== payload),
      };
    case TYPES.ADD_TICKET:
      return helpers.addTicket(state, payload);
    case TYPES.DELETE_TICKET:
      return helpers.deleteTicket(state, payload);
    default:
      return state;
  }
}

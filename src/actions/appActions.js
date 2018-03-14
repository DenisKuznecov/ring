import * as TYPES from '../types/appTypes';

export const addColumn = payload => ({
  type: TYPES.ADD_COLUMN,
  payload,
});

export const deleteColumn = payload => ({
  type: TYPES.DELETE_COLUMN,
  payload,
});

export const addTicket = payload => ({
  type: TYPES.ADD_TICKET,
  payload,
});

export const deleteTicket = payload => ({
  type: TYPES.DELETE_TICKET,
  payload,
});

export const updateColumns = payload => ({
  type: TYPES.UPDATE_COLUMNS,
  payload,
});

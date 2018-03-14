const saveToLs = (data) => console.log()
//  || localStorage.setItem('data', JSON.stringify(data));

/**
 * helper function for adding column to store and ls
 * @param {*object} state 
 * @param {*number} payload 
 */
export const addColumn = (state, payload) => {
  const newState = {
    ...state,
    columns: [ ...state.columns, payload ],
  };
  saveToLs(newState);

  return newState;
};

/**
 * helper function for deleting column from store and ls
 * @param {*object} state 
 * @param {*number} payload 
 */
export const deleteColumn = (state, payload) => {
  const newState = {
    ...state,
    columns: state.columns.filter(column => column.id !== payload),
  };
  saveToLs(newState);

  return newState;
};

/**
 * helper function for deleting ticket from store and ls
 * @param {*object} state 
 * @param {*object} payload 
 */
export const deleteTicket = (state, payload) => {
  const newState = {
    ...state,
    columns: state.columns.map((column) => {
      if (column.id === payload.columnId) {
        return {
          ...column,
          tickets: column.tickets.filter(ticket => ticket.id !== payload.ticketId),
        };
      }
      return column;
    }),
  };
  saveToLs(newState);

  return newState;
};

/**
 * helper function for adding ticket to store and ls
 * @param {*object} state 
 * @param {*object} payload 
 */
export const addTicket = (state, payload) => {
  const newState = {
    ...state,
    columns: state.columns.map((column) => {
      if (column.id === payload.columnId) {
        return {
          ...column,
          tickets: [ ...column.tickets, payload.ticket ],
        };
      }
      return column;
    }),
  };
  saveToLs(newState);

  return newState;
};

export const updateColumns = (state, { id, destinationIdx, sourceIdx }) => {
  const targetColumn = {...state.columns[sourceIdx]};
  console.log('target', targetColumn);
  const columns = [...state.columns.filter((item, idx) => idx !== sourceIdx)];
  console.log('filteredArray', columns);
  columns[sourceIdx + destinationIdx] = targetColumn;
  console.log('changed', columns);
  
  const newState = {
    ...state,
    columns,
  };
  saveToLs(newState);

  return newState;
}

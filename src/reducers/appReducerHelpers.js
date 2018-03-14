const saveToLs = (data) => localStorage.setItem('data', JSON.stringify(data));

const arraySort = (arr, prevIdx, nextIdx) => {
  const array = arr.slice(0);
  if (prevIdx >= array.length) {
    let k = prevIdx - array.length;
    while (k-- + 1) {
      array.push(undefined);
    }
  }
  array.splice(prevIdx, 0, array.splice(nextIdx, 1)[0]);
  return array;
}

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

/**
 * For sorting columns while drag and drop
 * @param {object} state 
 * @param {*} param1
 */
export const updateColumns = (state, { destinationIdx, sourceIdx }) => {
  const destIdx = destinationIdx === -1 ? 0 : destinationIdx;
  const columns = arraySort(state.columns, destIdx, sourceIdx);

  const newState = { ...state, columns };
  saveToLs(newState);

  return newState;
}

/**
 * For sorting tickets while drag and drop
 * @param {object} state 
 * @param {*} param1
 */
export const updateTickets = (state, { destinationIdx, sourceIdx }) => {
  // const destIdx = destinationIdx === -1 ? 0 : destinationIdx;
  // const columns = arraySort(state.columns, destIdx, sourceIdx);

  const newState = { ...state };
  saveToLs(newState);

  return newState;
}

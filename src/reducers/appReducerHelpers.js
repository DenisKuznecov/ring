
const saveToLs = (data) => localStorage.setItem('data', JSON.stringify(data));

/**
 * for sorting columns and tickets arrays
 * @param {array} arr 
 * @param {*number} prevIdx 
 * @param {*number} nextIdx 
 * @param {*object} anotherTicket
 * @returns {*array}
 */
const arraySort = (arr, prevIdx, nextIdx, anotherTicket) => {
  const array = arr.slice(0);
  if (prevIdx >= array.length) {
    let k = prevIdx - array.length;
    while (k-- + 1) {
      array.push(undefined);
    }
  }
  array.splice(prevIdx, 0, anotherTicket || array.splice(nextIdx, 1)[0]);
  return array;
}


/**
 * helper function for adding column to store and ls
 * @param {*object} state
 * @param {*number} payload
 * @returns {*object}
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
 * @returns {*object}
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
 * @returns {*object}
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
 * @returns {*object}
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
 * @returns {*object}
 */
export const updateColumns = (state, { destinationIdx, sourceIdx }) => {
  const destIdx = destinationIdx === -1 ? 0 : destinationIdx;
  const columns = arraySort(state.columns, destIdx, sourceIdx);

  const newState = { ...state, columns };
  saveToLs(newState);

  return newState;
}


// For returning new state object when ticket was sorted
const newTicketsState = (state, tickets, prevColumn, nextColumn) => ({
  ...state,
  columns: state.columns.map(column => {
    if (column.id === nextColumn.id) {
      return {
        ...column,
        tickets: tickets.filter(t => !!t),
      };
    } else if (column.id === prevColumn.id) {
      return prevColumn;
    }
    return column;
  }),
});


/**
 * For sorting tickets in one column and between multiple columns
 * @param {object} state 
 * @param {*object} data
 * @returns {*object}
 */
export const updateTickets = (state, data) => {
  // bool value if this is the same column
  const oneColumn = data.sourceId === data.destId;
  const destIdx = data.destinationIdx === -1 ? 0 : data.destinationIdx;
  const nextColumn = state.columns.find(c => c.id === data.destId);
  let prevColumn = state.columns.find(c => c.id === data.sourceId);
  let tickets = [...nextColumn.tickets];

  if (oneColumn) {
    tickets = arraySort(tickets, destIdx, data.sourceIdx);
  } else {
    const ticket = prevColumn.tickets.find(t => t.id === data.dragId);
    // delete ticket that was dragged from source column
    prevColumn = {
      ...prevColumn,
      tickets: prevColumn.tickets.filter(t => t.id !== data.dragId),
    };
    tickets = arraySort(tickets, destIdx, data.sourceIdx, ticket);
  }

  const newState = newTicketsState(state, tickets, prevColumn, nextColumn)
  saveToLs(newState);

  return newState;
}

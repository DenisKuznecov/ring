/**
 * helper function for deleting ticket from store
 * @param {*object} state 
 * @param {*object} payload 
 */
export const deleteTicket = (state, payload) => ({
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
});

/**
 * helper function for adding ticket from store
 * @param {*object} state 
 * @param {*object} payload 
 */
export const addTicket = (state, payload) => ({
  ...state,
  columns: state.columns.map((column) => {
    if (column.id === payload.columnId) {
      return {
        ...column,
        tickets: [ ...column.tickets, payload.ticket ],
      };
    }
    return column;
  })
});
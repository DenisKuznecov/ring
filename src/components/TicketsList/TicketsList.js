import React from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';

import TicketWrap from './TicketWrap/TicketWrap';

const TicketsList = ({
  tickets,
  onDeleteTicket,
  columnId,
}) => (
  <Droppable droppableId={String(columnId)} type="TICKETS">
    {(provided, snapshot) => (
      <div
        className="tickets-container"
        ref={provided.innerRef}
        {...provided.droppableProps}
      >
      {
        tickets.length > 0 ?
          tickets.map((item, idx) => (
            <TicketWrap
              key={item.id}
              id={item.id}
              idx={idx}
              onDelete={() => onDeleteTicket(item.id)}
              descr={item.descr}
              color={item.color}
            />
          )) :
          <p>Please add ticket</p>
      }
      </div>
    )}
  </Droppable>
);

TicketsList.propTypes = {
  tickets: PropTypes.array.isRequired,
  onDeleteTicket: PropTypes.func.isRequired,
  columnId: PropTypes.number.isRequired,
};

export default TicketsList;
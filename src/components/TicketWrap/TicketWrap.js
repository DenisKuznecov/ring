import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

import { CloseIcon } from '../';

const TicketWrap = ({
  onDelete,
  descr,
  color,
  id,
  idx,
}) => {
  const ticketStyle = {
    backgroundColor: color,
  };

  return (
    <Draggable draggableId={String(id)} type="TICKETS" index={idx}>
      {(provided, snapshot) => (
        <div>
          <div
            style = {ticketStyle}
            className="ticket-wrap"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <CloseIcon onClick={onDelete}/>
            <p className="ticket-descr">
              {descr}
            </p>
          </div>
        </div>
      )}
    </Draggable>
  );
};

TicketWrap.propTypes = {
  onDelete: PropTypes.func.isRequired,
  descr: PropTypes.string.isRequired,
  color: PropTypes.string,
  id: PropTypes.number.isRequired,
  idx: PropTypes.number.isRequired,
};

TicketWrap.defaultTypes = {
  color: '#fff',
};

export default TicketWrap;
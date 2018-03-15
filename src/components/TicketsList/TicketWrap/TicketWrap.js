import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

import { CloseIcon } from '../../';

const TicketWrap = ({
  onDelete,
  descr,
  color,
  id,
  idx,
}) => {
  const styles = (providedStyles) => ({
    backgroundColor: color || '#fff',
    ...providedStyles,
  })

  return (
    <Draggable draggableId={String(id)} type="TICKETS" index={idx}>
      {(provided, snapshot) => (
        <div>
          <div
            className="ticket-wrap"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={styles(provided.draggableProps.style)}
          >
            <CloseIcon onClick={onDelete}/>
            <p className="ticket-descr">
              {descr}
            </p>
          </div>
          {provided.placeholder}
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

export default TicketWrap;
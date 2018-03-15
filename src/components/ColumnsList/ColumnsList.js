import React from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';

import ColumnWrap from './ColumnWrap/ColumnWrap';

const ColumnsList = ({
  columns,
  onDeleteColumn,
  onDeleteTicket,
  onAddTicket,
}) => (
  <Droppable
    droppableId="columns"
    type="COLUMNS"
    direction="horizontal"
  >
    {(provided, snapshot) => (
      <div
        className="columns-list"
        ref={provided.innerRef}
        {...provided.droppableProps}
      >
        {
          columns.length > 0 ?
            columns.map((item, idx) => (
              <ColumnWrap
                key={item.id}
                onDeleteColumn={() => onDeleteColumn(item.id)}
                onDeleteTicket={onDeleteTicket}
                onAddTicket={onAddTicket}
                column={item}
                idx={idx}
              />
            )) :
            <p className="info-message">There is no columns yet.</p>
        }
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);

ColumnsList.propTypes = {
  columns: PropTypes.array.isRequired,
  onDeleteColumn: PropTypes.func.isRequired,
  onDeleteTicket: PropTypes.func.isRequired,
  onAddTicket: PropTypes.func.isRequired,
};

export default ColumnsList;
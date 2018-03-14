import React from 'react';
import PropTypes from 'prop-types';

import { CloseIcon } from '../';

const TicketWrap = ({
  onDelete,
  descr,
  color,
}) => {
  const ticketStyle = {
    backgroundColor: color,
  };
  return (
    <div style ={ticketStyle} className="ticket-wrap">
      <CloseIcon onClick={onDelete}/>
      <p className="ticket-descr">
        {descr}
      </p>
    </div>
  );
};

TicketWrap.propTypes = {
  onDelete: PropTypes.func.isRequired,
  descr: PropTypes.string.isRequired,
  color: PropTypes.string,
};

TicketWrap.defaultTypes = {
  color: '#fff',
};

export default TicketWrap;
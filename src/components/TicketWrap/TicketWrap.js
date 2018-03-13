import React from 'react';
import PropTypes from 'prop-types';

import { CloseIcon } from '../';

const TicketWrap = ({
  onDelete,
  descr,
}) => (
  <div className="ticket-wrap">
    <CloseIcon onClick={onDelete}/>
    <p className="ticket-descr">
      {descr}
    </p>
  </div>
);

TicketWrap.propTypes = {
  onDelete: PropTypes.func.isRequired,
  descr: PropTypes.string.isRequired,
};

export default TicketWrap;
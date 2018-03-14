import React from 'react';
import PropTypes from 'prop-types';
import { CirclePicker } from 'react-color';

const AddTicketInput = ({
  onSubmit,
  setValue,
  ticketColor,
  ticketDescr,
}) => (
  <form onSubmit={onSubmit}>
    <input
      className="add-ticket-input"
      placeholder="Add a card..."
      value={ticketDescr}
      onChange={e => setValue('ticketDescr', e.target.value)}
    />
    <CirclePicker
      width="100%"
      color={ticketColor}
      onChangeComplete={color => setValue('ticketColor', color.hex)}
    />
  </form>
);

AddTicketInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  ticketDescr: PropTypes.string.isRequired,
  ticketColor: PropTypes.string.isRequired,
};

export default AddTicketInput;
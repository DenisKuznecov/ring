import React from 'react';
import PropTypes from 'prop-types';

const CloseIcon = ({
  onClick,
}) => (
  <button onClick={onClick} className="close-icon">
    <span className="close-icon-stick"></span>
    <span className="close-icon-stick"></span>
  </button>
);

CloseIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CloseIcon;

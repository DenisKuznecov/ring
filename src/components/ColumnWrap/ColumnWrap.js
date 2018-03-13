import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  CloseIcon,
  TicketWrap,
} from '../';

export default class ColumnWrap extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    tickets: PropTypes.array.isRequired,
  };

  render () {
    const { onDelete, title, tickets } = this.props;

    return (
      <div className="column-wrap">
        <CloseIcon onClick={onDelete}/>

        <div className="column-title">
          {title}
        </div>

        <div className="tickets-container">
          {
            tickets.map((item, idx) => (
              <TicketWrap
                key={item.id}
                onDelete={item.onDelete}
                descr={item.descr}
              />
            ))
          }
        </div>
        
        <input
          className="add-ticket-input"
          placeholder="Add a card..."
        />
      </div>
    );
  }
}
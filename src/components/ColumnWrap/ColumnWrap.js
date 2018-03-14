import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  CloseIcon,
  TicketWrap,
} from '../';

export default class ColumnWrap extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ticketDescr: ''
    };
  }

  static propTypes = {
    onDeleteColumn: PropTypes.func.isRequired,
    onDeleteTicket: PropTypes.func.isRequired,
    onAddTicket: PropTypes.func.isRequired,
    column: PropTypes.object.isRequired,
  };

  // Save ticket to the store
  onSubmit = (e, columnId) => {
    e.preventDefault();
    const payload = {
      columnId,
      ticket: {
        descr: this.state.ticketDescr,
        id: new Date().getMilliseconds(),
      },
    };

    this.props.onAddTicket(payload);
    this.setState({ ticketDescr: '' });
  }

  onChange = ({ target }) => this.setState({ ticketDescr: target.value })

  render () {
    const {
      onDeleteColumn,
      onDeleteTicket,
      column: { title, tickets, id },
    } = this.props;

    const { ticketDescr } = this.state;

    return (
      <div className="column-wrap">
        <CloseIcon onClick={onDeleteColumn}/>

        <h2 className="column-title">
          {title}
        </h2>

        <div className="tickets-container">
          {
            tickets.length > 0 ?
              tickets.map((item, idx) => (
                <TicketWrap
                  key={item.id}
                  onDelete={() => onDeleteTicket(id, item.id)}
                  descr={item.descr}
                />
              )) :
              <p>Please add ticket</p>
          }
        </div>
        
        <form onSubmit={e => this.onSubmit(e, id)}>
          <input
            className="add-ticket-input"
            placeholder="Add a card..."
            value={ticketDescr}
            onChange={this.onChange}
          />
        </form>
      </div>
    );
  }
}
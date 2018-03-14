import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

import {
  CloseIcon,
  TicketWrap,
} from '../';

import AddTicketInput from './AddTicketInput';

export default class ColumnWrap extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ticketDescr: '',
      ticketColor: '',
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
        color: this.state.ticketColor,
        id: new Date().getMilliseconds(),
      },
    };

    this.props.onAddTicket(payload);
    this.setState({ ticketDescr: '' });
  }

  setValue = (field, value) => this.setState({ [field]: value })

  render () {
    const {
      onDeleteColumn,
      onDeleteTicket,
      idx,
      column: { title, tickets, id },
    } = this.props;

    const { ticketDescr, ticketColor } = this.state;

    return (
      <Draggable draggableId={String(id)} type="COLUMNS" index={idx}>
        {(provided, snapshot) => (
          <div>
          <div
            className="column-wrap"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <CloseIcon onClick={onDeleteColumn}/>

            <h2 className="column-title">
              {title}
            </h2>

            <div className="tickets-container">
              {
                tickets.length > 0 ?
                  tickets.map((item) => (
                    <TicketWrap
                      key={item.id}
                      onDelete={() => onDeleteTicket(id, item.id)}
                      descr={item.descr}
                      color={item.color}
                    />
                  )) :
                  <p>Please add ticket</p>
              }
            </div>

            <AddTicketInput
              onSubmit={e => this.onSubmit(e, id)}
              setValue={this.setValue}
              ticketDescr={ticketDescr}
              ticketColor={ticketColor}
            />
          </div>
          {provided.placholder}
          </div>
        )}
      </Draggable>
    );
  }
}
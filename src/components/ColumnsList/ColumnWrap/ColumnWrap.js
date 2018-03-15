import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

import {
  CloseIcon,
  TicketsList,
} from '../../';

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
    if (this.state.ticketDescr) {
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
              style={{ backgroundColor: snapshot.isDragging ? 'blue' : 'white' }}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <CloseIcon onClick={onDeleteColumn}/>

              <h2 className="column-title">
                {title}
              </h2>
              
              <TicketsList
                tickets={tickets}
                columnId={id}
                onDeleteTicket={(ticketId) => onDeleteTicket(id, ticketId)}
              />

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
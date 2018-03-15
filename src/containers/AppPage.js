import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DragDropContext } from 'react-beautiful-dnd';
import isMobile from 'ismobilejs';

import * as appActions from '../actions/appActions';

import { ColumnWrap, ColumnsList } from '../components';

class AppPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      columnTitle: '',
    };
  }

  static propTypes = {
    columns: PropTypes.array,
  }
  
  static defaultTypes = {
    columns: [],
  }

  componentDidUpdate(prevProps) {
    if (prevProps.columns.length < this.props.columns.length) {
      this.scrollToTheRight();
    }
  }

  onDeleteColumn = (columnId) => this.props.deleteColumn(columnId)

  onDeleteTicket = (columnId, ticketId) => this.props.deleteTicket({
    columnId,
    ticketId,
  })

  onAddTicket = payload => this.props.addTicket(payload)

  onAddColumn = (e) => {
    e.preventDefault();
    if (this.state.columnTitle) {
      const payload = {
        id: new Date().getMilliseconds(),
        title: this.state.columnTitle,
        tickets: [],
      };
  
      this.props.addColumn(payload);
      this.setState({ columnTitle: '' });
    } 
  }

  //check if user drag column or ticket and fire up necessary event with necessary data
  onDragEnd = (result) => {
    if (result.reason === 'DROP' && result.destination) {
      result.type === 'COLUMNS' ?
        this.onUpdateColumns(result) : this.onUpdateTickets(result);
    }
  }

  // sort columns when user change column location
  onUpdateColumns = (data) => {
    const payload = {
      destinationIdx: data.destination ? data.destination.index : null,
      sourceIdx: data.source.index,
    };
    this.props.updateColumns(payload);
  }

  // sort tickets when user change ticket location
  onUpdateTickets = (data) => {
    const payload = {
      destinationIdx: data.destination ? data.destination.index : null,
      sourceIdx: data.source.index,
      destId: data.destination ? +data.destination.droppableId : null,
      sourceId: +data.source.droppableId,
      dragId: +data.draggableId,
    };
    this.props.updateTickets(payload);
  }

  // For scrolling block to the right or left end when user add new column
  scrollToTheRight = () => {
    const elem = document.getElementsByClassName('app-container')[0];
    const xpos = isMobile.phone ? 0 : elem.scrollWidth;
    elem.scrollTo(xpos, 0);
  }

  onChange = ({ target }) => this.setState({ columnTitle: target.value })

  render() {
    const { columns } = this.props;

    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
      >
        <div className="app-container">
          <ColumnsList
            columns={columns}
            onDeleteColumn={this.onDeleteColumn}
            onDeleteTicket={this.onDeleteTicket}
            onAddTicket={this.onAddTicket}
          />

          <form onSubmit={this.onAddColumn} className="add-column-wrap">
            <input
              className="add-column-input"
              placeholder="Add a list..."
              value={this.state.columnTitle}
              onChange={this.onChange}
            />
          </form>
        </div>
      </DragDropContext>
    )
  }
}

const mapStateToProps = state => ({
  columns: state.app.columns,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(appActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppPage);

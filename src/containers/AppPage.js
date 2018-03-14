import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DragDropContext } from 'react-beautiful-dnd';

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
    console.log(prevProps);
    // Scroll block to the right if length of columns array is different
    if (prevProps.columns.length !== this.props.columns.length) {
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
    const payload = {
      id: new Date().getMilliseconds(),
      title: this.state.columnTitle,
      tickets: [],
    };

    this.props.addColumn(payload);
    this.setState({ columnTitle: '' });
  }

  // For scrolling block to the right end
  scrollToTheRight = () => {
    const elem = document.getElementsByClassName('app-container')[0];
    elem.scrollTo(elem.scrollWidth, 0);
  }

  onChange = ({ target }) => this.setState({ columnTitle: target.value })

  /**
   * check if user drag column or ticket
   * and fire up necessary event with necessary data
   */
  onDragEnd = (result) => {
    console.log(result);
    if (result.reason === 'DROP' && result.destination) {
      if (result.type === 'COLUMNS') {
        const payload = {
          destinationIdx: result.destination ? result.destination.index : null,
          sourceIdx: result.source.index,
        };
        this.props.updateColumns(payload);
      } else {
        const payload = {
          destinationIdx: result.destination ? result.destination.index : null,
          sourceIdx: result.source.index,
          destId: result.destination ? result.destination.droppableId : null,
          sourceId: result.source.index.droppableId,
        };
        this.props.updateTickets(payload);
      }
    }
  };

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

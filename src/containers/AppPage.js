import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as appActions from '../actions/appActions';

import { ColumnWrap } from '../components';

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
    if (prevProps.columns.length !== this.props.columns) {
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

  render() {
    const { columns } = this.props;

    return (
      <div className="app-container">
        <div className="columns-list">
          {
            columns.length > 0 ?
              columns.map(item => (
                <ColumnWrap
                  key={item.id}
                  onDeleteColumn={() => this.onDeleteColumn(item.id)}
                  onDeleteTicket={this.onDeleteTicket}
                  onAddTicket={this.onAddTicket}
                  column={item}
                />
              )) :
              <p className="info-message">There is no columns yet.</p>
          }
        </div>

        <form onSubmit={this.onAddColumn} className="add-column-wrap">
          <input
            className="add-column-input"
            placeholder="Add a list..."
            value={this.state.columnTitle}
            onChange={this.onChange}
          />
        </form>
      </div>
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

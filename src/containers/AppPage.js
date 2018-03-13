import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { setData } from '../actions/App/AppActions';

// import '../style/style.scss';

class AppPage extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <div className="app-container">
asdas
        <div className="content-container">
          {this.props.children}
        </div>
      </div>
    )
  }
}

AppPage.propTypes = {};

// Which props do we want to inject, given the global state?
function mapStateToProps(state) {
  return state;
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(AppPage);

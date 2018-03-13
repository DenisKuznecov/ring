import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import _ from 'lodash';

import { AppPage } from './containers';

import { configureStore } from './config/store';

import './style/main.scss';

const store = configureStore();

export default class Main extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppPage/>
      </Provider>
    );
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);

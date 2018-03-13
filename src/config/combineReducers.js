import { combineReducers } from 'redux';

import {
  appReducer as App,
} from '../reducers/';

const reducers = combineReducers({
  App,
});

export default reducers;
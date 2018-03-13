import { combineReducers } from 'redux';

import {
  appReducer as app,
} from '../reducers/appReducer';

const reducers = combineReducers({
  app,
});

export default reducers;
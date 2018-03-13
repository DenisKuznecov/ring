import {
  createStore,
  applyMiddleware,
} from 'redux';
import createLogger from 'redux-logger';

import reducers from './combineReducers';

export const configureStore = ()  => {
  const loggerMiddleware = createLogger({
    level: 'info',
    collapsed: true
  });

  let result;

  if(process.env.NODE_ENV == 'production'){
    result = createStore(
      reducers,
    );
  }
  else{
    result = createStore(
      reducers,
      applyMiddleware(
        loggerMiddleware
      )
    );
  }

  return result;
}


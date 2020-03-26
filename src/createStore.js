import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import * as reducers from './reducers';


const createRootReducer = (history) => combineReducers({
  ...reducers,
  router: connectRouter(history),
});

export const history = createBrowserHistory();


export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    compose(
      applyMiddleware(
        logger,
        thunk,
        routerMiddleware(history)
      ),
    ),
  );

  return store
}

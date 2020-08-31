/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import {
  api,
  requestsMiddleware,
  sessionMiddleware,
  // crudMiddleware,
  requestPrepareMiddleware,
} from './middleware';

import makeRootReducer from './reducers';
import rootSaga from './rootSaga';

export const history = createBrowserHistory();

function configureStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();
  const coonectedRouterMiddleware = routerMiddleware(history);

  const middleware = [
    thunk,
    requestsMiddleware,
    requestPrepareMiddleware,
    api,
    sessionMiddleware,
    // This midlware causes bugs. Todo: rewrite and move to sagas
    // crudMiddleware,
    sagaMiddleware,
    coonectedRouterMiddleware,
  ];
  const enhancers = [];
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  if (process.NODE_ENV === 'development') {
    enhancers.push(
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__(),
    );
  }

  const store = createStore(
    makeRootReducer(history),
    initialState,
    composeEnhancers(applyMiddleware(...middleware), ...enhancers),
  );

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('./reducers', () => {
        store.replaceReducer(makeRootReducer());
      });
    }
  }

  store.asyncReducers = {};

  sagaMiddleware.run(rootSaga);

  return store;
}

export default configureStore;

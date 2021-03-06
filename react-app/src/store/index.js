import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import crypto from './crypto'
import user from './user'
import portfolio from './portfolio'
import transaction from './transaction'
import watchlist from './watchlist';
import watchCrypto from './watchCrypto'
import data from './cryptoData'
import news from './news'

const rootReducer = combineReducers({
  session,
  crypto,
  user,
  portfolio,
  transaction,
  watchlist,
  watchCrypto,
  data,
  news
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;

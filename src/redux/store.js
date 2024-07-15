import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk  from 'redux-thunk';  // Zmieniono import na nazwany eksport
import initialState from './initialState';
import tablesReducer from './tablesRedux';

const subreducers = {
  tablesRedux: tablesReducer,
};

const reducer = combineReducers(subreducers);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;  // Użyj __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ zamiast __REDUX_DEVTOOLS_EXTENSION__

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

export default store;

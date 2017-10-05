import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import message from './messageReducers';
import search from './searchReducers';
import fridge from './fridgeReducers';
import items from './itemReducers';
import auth from './authReducers';
import graph from './graphReducers';

const FridgeApp = combineReducers({
  auth,
  message,
  search,
  fridge,
  items,
  graph,
  routing: routerReducer,
});

export default FridgeApp;
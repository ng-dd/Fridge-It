import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import video from './vidChatReducers';
import message from './messageReducers';
import search from './searchReducers';
import fridge from './fridgeReducers';
import items from './itemReducers';
import auth from './authReducers';

const FridgeApp = combineReducers({
  auth,
  message,
  video,
  search,
  fridge,
  items,
  routing: routerReducer,
});

export default FridgeApp;
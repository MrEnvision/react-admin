import { createStore, combineReducers } from 'redux';
import configReducer from './reducer/config';

// 可以组合多个reducer
const allReducer = combineReducers({
  configReducer,
});

const store = createStore(allReducer);

export default store;

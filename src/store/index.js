import { createStore, combineReducers } from 'redux';
import configReducer from './reducer/config';
import departmentReducer from './reducer/department';

// 可以组合多个reducer
const allReducer = combineReducers({
  configReducer,
  departmentReducer,
});

const store = createStore(allReducer);

export default store;

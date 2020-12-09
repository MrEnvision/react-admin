import { createStore, combineReducers } from 'redux';
import departmentReducer from './reducer/department';

// 可以组合多个reducer
const allReducer = combineReducers({
  departmentReducer,
});

const store = createStore(allReducer);

export default store;

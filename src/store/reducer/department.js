import { actionType } from '../Type';

// 初始存储的数据
const initState = {};

// reducer
const departmentReducer = function (state = initState, action) {
  if (action.type === actionType.departmentAddInfo) {
    const stateData = JSON.parse(JSON.stringify(state));
    stateData.info.push(action.payload);
    return stateData;
  }
  return state;
};

export default departmentReducer;

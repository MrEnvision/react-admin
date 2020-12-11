import {
  updateDepartmentSearchData,
  updateDepartmentListData,
  updateDepartmentTotalData,
} from '../actionType';

const initState = {
  dataSource: [],
  total: 0,
  searchData: {},
};

const departmentReducer = function (state = initState, action) {
  switch (action.type) {
    case updateDepartmentListData: {
      return {
        ...state,
        dataSource: action.payload,
      };
    }
    case updateDepartmentTotalData: {
      return {
        ...state,
        total: action.payload,
      };
    }
    case updateDepartmentSearchData: {
      return {
        ...state,
        searchData: action.payload,
      };
    }
    default:
      return state;
  }
};

export default departmentReducer;

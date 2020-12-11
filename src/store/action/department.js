import {
  updateDepartmentListData,
  updateDepartmentTotalData,
  updateDepartmentSearchData,
} from '../actionType';

export function updateDepartmentList(data) {
  return {
    type: updateDepartmentListData,
    payload: data,
  };
}

export function updateDepartmentTotal(data) {
  return {
    type: updateDepartmentTotalData,
    payload: data,
  };
}

export function updateDepartmentSearch(data) {
  return {
    type: updateDepartmentSearchData,
    payload: data,
  };
}

import { actionType } from '../Type';

export function addInfo(value) {
  return {
    type: actionType.departmentAddInfo,
    payload: value,
  };
}

import { setTokenKey, setUsernameKey } from '../actionType';
import { setToken, setUsername } from '../../utils/cookie';

export function setTokenAction(data) {
  setToken(data);
  return {
    type: setTokenKey,
    payload: data,
  };
}

export function setUsernameAction(data) {
  setUsername(data);
  return {
    type: setUsernameKey,
    payload: data,
  };
}

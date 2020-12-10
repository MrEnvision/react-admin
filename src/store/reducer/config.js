import { getToken, getUsername } from '../../utils/cookie';
import { setTokenKey, setUsernameKey } from '../actionType';

const initState = {
  token: '' || getToken(), // 登录后存储了 token 和 username
  username: '' || getUsername(),
};

const configReducer = function (state = initState, action) {
  switch (action.type) {
    case setTokenKey: {
      return {
        ...state,
        token: action.payload,
      };
    }
    case setUsernameKey: {
      return {
        ...state,
        username: action.payload,
      };
    }
    default:
      return state;
  }
};

export default configReducer;

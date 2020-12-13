import { getToken, getUsername } from '../../utils/cookie';
import { setTokenKey, setUsernameKey } from '../actionType';

const initState = {
  token: '' || getToken(),
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

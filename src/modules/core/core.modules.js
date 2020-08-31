import jwt from 'jsonwebtoken';
import {
  SET_THEME_COLOR,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  DICTIONARY_GET_SUCCESS,
  SIGN_OUT,
} from './core.types';

import { HelperService } from '../../services';

// TODO : REMOVE THIS !!!!! IT"S VERY BAD!!
const secret = 'yKarytod17Gc3FsGPkiYUI77sqUqw5A8';

// TODO : REMOVE THIS !!!!! IT"S VERY BAD!!
function parseToken(token) {
  try {
    const result = jwt.verify(token, secret);
    return result;
  } catch (err) {
    return false;
  }
}

function getRole(token) {
  const parsedToken = parseToken(token) || {};

  return {
    name: parsedToken.role,
    restaurant_id: parsedToken.id,
  };
}

const getInitialState = () => {
  const token = HelperService.getFromStorage(localStorage, 'token');

  return {
    user: null,
    token,
    isAuth: Boolean(parseToken(token)),
    role: getRole(token),
    userInfo: null,
    dictionary: {
      cuisine: [],
      revenues: [],
      subscriptions: [],
      agent_names: [],
      deliveryMethods: [],
      statuses: [
        { name: 'Blocked', value: 'blocked' },
        { name: 'Active', value: 'active' },
      ],
    },
    bgColor: 'white',
    theme: {
      useNextVariants: true,
      palette: {
        primary: {
          main: '#f06338',
        },
        secondary: {
          main: '#5b9be4',
        },
      },
    },
    signInLoading: false,
    forgotPasswordLoading: false,
    resetPasswordLoading: false,
    error: null,
  };
};

export function reducer(state = getInitialState(), action) {
  switch (action.type) {
    case SIGN_IN_REQUEST: {
      return {
        ...state,
        signInLoading: true,
      };
    }

    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPasswordLoading: true,
      };
    }

    case FORGOT_PASSWORD_SUCCESS:
    case FORGOT_PASSWORD_ERROR: {
      return {
        ...state,
        forgotPasswordLoading: false,
      };
    }

    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordLoading: true,
      };
    }

    case RESET_PASSWORD_SUCCESS:
    case RESET_PASSWORD_ERROR: {
      return {
        ...state,
        resetPasswordLoading: false,
      };
    }

    case SET_THEME_COLOR: {
      return {
        ...state,
        bgColor: action.bgColor || state.bgColor,
        theme: {
          ...state.theme,
          palette: {
            ...state.theme.palete,
            primary: {
              main: action.color || state.theme.palette.primary.main,
            },
          },
        },
      };
    }

    case SIGN_IN_SUCCESS: {
      const { user, token } = action.response;

      return {
        ...state,
        signInLoading: false,
        token,
        isAuth: Boolean(token),
        role: getRole(token),
        user,
      };
    }

    case DICTIONARY_GET_SUCCESS: {
      return {
        ...state,
        dictionary: {
          ...state.dictionary,
          ...action.response,
        },
      };
    }

    case SIGN_OUT: {
      return getInitialState();
    }

    case SIGN_IN_ERROR: {
      return {
        ...state,
        signInLoading: false,
        error: action.error,
      };
    }

    default:
      return state;
  }
}

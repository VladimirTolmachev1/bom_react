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
  DICTIONARY_GET_REQUEST,
  DICTIONARY_GET_SUCCESS,
  DICTIONARY_GET_ERROR,
  SIGN_OUT,
  API_REQUESTS_ABORT,
  LOG_REQUEST,
  dictionaryResource,
} from './core.types';

import { CALL_API } from '../../store/middleware/api';

export function setThemeColor(color, bgColor) {
  return {
    type: SET_THEME_COLOR,
    color,
    bgColor,
  };
}

export function signIn(body) {
  return {
    type: CALL_API,
    request: {
      endpoint: '/auth/login',
      method: 'POST',
      types: [SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_ERROR],
      logger: {
        success: 'Successfully signed in',
        error: 'Error during sign in',
      },
      body,
    },
  };
}

export function forgotPassword(body) {
  return {
    type: CALL_API,
    request: {
      endpoint: '/password/email',
      method: 'POST',
      types: [
        FORGOT_PASSWORD_REQUEST,
        FORGOT_PASSWORD_SUCCESS,
        FORGOT_PASSWORD_ERROR,
      ],
      logger: {
        success: 'Please, check your email to follow next instructions',
        error: 'Error during password recovery',
      },
      body,
    },
  };
}

export function resetPassword(body) {
  return {
    type: CALL_API,
    request: {
      endpoint: '/password/reset',
      method: 'POST',
      types: [
        RESET_PASSWORD_REQUEST,
        RESET_PASSWORD_SUCCESS,
        RESET_PASSWORD_ERROR,
      ],
      logger: {
        success: 'Password was successfully reset',
        error: 'Error during password reset',
      },
      body,
    },
  };
}

export function getDictionaries() {
  return {
    type: CALL_API,
    request: {
      endpoint: dictionaryResource,
      method: 'GET',
      types: [
        DICTIONARY_GET_REQUEST,
        DICTIONARY_GET_SUCCESS,
        DICTIONARY_GET_ERROR,
      ],
    },
  };
}

export function signOut() {
  return {
    type: SIGN_OUT,
  };
}

export function abortPageRequests() {
  return {
    type: API_REQUESTS_ABORT,
    requestTypes: [SIGN_IN_REQUEST, FORGOT_PASSWORD_REQUEST],
  };
}

export function makeApiRequest({ type, ...rest }) {
  return {
    type,
    ...rest,
  };
}

export function logRequest({ request, response }) {
  return {
    type: LOG_REQUEST,
    request,
    response,
  };
}

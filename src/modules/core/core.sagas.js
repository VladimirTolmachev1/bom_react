/* eslint-disable require-yield */
import { takeLatest, all } from 'redux-saga/effects';
import { axiosInstance } from '../../services/BaseApiService/axiosInstance';

import { SIGN_IN_SUCCESS, SIGN_OUT } from './core.types';

// todo: put here all sign-in logic
function* signInSaga(action) {
  const { token } = action.response;

  axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
}

function* signOutSaga() {
  delete axiosInstance.defaults.headers.Authorization;
  localStorage.removeItem('token');
}

export function* authSaga() {
  yield all([
    // TODO: change trigger to SIGN_IN_REQUEST
    takeLatest(SIGN_IN_SUCCESS, signInSaga),
    takeLatest(SIGN_OUT, signOutSaga),
  ]);
}

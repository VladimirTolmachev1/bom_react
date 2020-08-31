import { takeLatest, all, call, put } from 'redux-saga/effects';

import DishesApiService from './dishes.api.service';

import {
  PATCH_DISH_EXTRAS_REQUEST,
  DISHES__GET_BY_ID_REQUEST,
} from './dishes.types';

import * as actions from './dishes.actions';

export function* patchDishExtrasSaga({ payload }) {
  try {
    const { data } = yield call(
      DishesApiService.patchExtras,
      payload.dishId,
      payload.extrasPayload,
    );

    yield put(actions.patchDishExtrasSuccess(data));

    return data;
  } catch (e) {
    console.error(e);
    yield put(actions.patchDishExtrasError(e));
    return Promise.reject(e);
  }
}

export function* getDishByIdSaga({ payload: id }) {
  try {
    const { data } = yield call(DishesApiService.getById, id);

    yield put(actions.getDishByIdSuccess(data));

    return data;
  } catch (e) {
    console.error(e);
    yield put(actions.getDishByIdError(e));
    return Promise.reject(e);
  }
}

export function* patchDishSizesSaga({ payload }) {
  try {
    const { data } = yield call(
      DishesApiService.patchSizes,
      payload.dishId,
      payload.sizesPayload,
    );

    yield put(actions.patchDishSizesSuccess(data));

    return data;
  } catch (e) {
    console.error(e);
    yield put(actions.patchDishSizesError(e));
    return Promise.reject(e);
  }
}

export function* updateDishSaga({ payload }) {
  try {
    const { data } = yield call(DishesApiService.updateDish, payload);

    yield put(actions.updateDishSuccess(data));

    return data;
  } catch (e) {
    console.error(e);
    yield put(actions.updateDishError(e));
    return Promise.reject(e);
  }
}

export function* createDishSaga({ payload }) {
  try {
    const { data } = yield call(DishesApiService.createDish, payload);
    yield put(actions.createDishSuccess(data));

    return data;
  } catch (e) {
    console.error(e);
    yield put(actions.createDishError(e));
    return Promise.reject(e);
  }
}

export function* dishesSaga() {
  yield all([
    takeLatest(PATCH_DISH_EXTRAS_REQUEST, patchDishExtrasSaga),
    takeLatest(DISHES__GET_BY_ID_REQUEST, getDishByIdSaga),
  ]);
}

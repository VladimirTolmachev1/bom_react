import { takeLatest, all, call, put } from 'redux-saga/effects';
import CategoriesApiService from './categories.api.service';

import { PATCH_CATEGORY_EXTRAS_REQUEST } from './categories.types';

import * as actions from './categories.actions';

export function* patchCategoryExtrasSaga({ payload }) {
  try {
    const { data } = yield call(
      CategoriesApiService.patchExtras,
      payload.categoryId,
      payload.extrasPayload,
    );

    yield put(actions.patchCategoryExtrasSuccess(data));

    return data;
  } catch (e) {
    console.error(e);
    yield put(actions.patchCategoryExtrasError(e));
    return Promise.reject(e);
  }
}

export function* updateCategorySaga({ payload }) {
  try {
    const { data } = yield call(CategoriesApiService.patch, payload);

    yield put(actions.updateCategorySuccess(data));

    return data;
  } catch (e) {
    console.error(e);
    yield put(actions.updateCategoryError(e));
    return Promise.reject(e);
  }
}

export function* createCategorySaga({ payload }) {
  try {
    const { data } = yield call(CategoriesApiService.create, payload);
    yield put(actions.createCategorySuccess(data));

    return data;
  } catch (e) {
    yield put(actions.createCategoryError(e));
    return Promise.reject(e);
  }
}

export function* categoriesSaga() {
  yield all([
    takeLatest(PATCH_CATEGORY_EXTRAS_REQUEST, patchCategoryExtrasSaga),
  ]);
}

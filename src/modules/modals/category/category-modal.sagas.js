import { takeLatest, all, put, select, call } from 'redux-saga/effects';
import { reset } from 'redux-form';
import {
  CATEGORY_MODAL__CREATE,
  CATEGORY_MODAL__UPDATE_INFO,
  CATEGORY_MODAL__RESET_FORMS,
  CATEGORY_MODAL__PATCH_EXTRAS,
  CATEGORY_MODAL__FULLY_CLEAR,
} from './category-modal.types';

import {
  SIZES_FORM,
  EXTRAS_FORM,
  CATEGORY_INFO_FORM,
} from '../../../components/forms/constants/form.names';

import {
  updateCategorySaga,
  patchCategoryExtrasSaga,
  createCategorySaga,
} from '../../categories';

import { managedRestaurantIdSelector } from '../../restaurants';

import {
  categoryInfoFormValuesSelector,
  extrasFormValuesSelector,
} from '../../../components/forms/selectors';

import { setCategoryModal } from './category-modal.actions';
import { showToast } from '../../../scenes/Toasts/modules';
import { managedCategoryIdSelector } from './category-modal.selectors';

function* createCategoryFromModalSaga() {
  try {
    const body = yield select(categoryInfoFormValuesSelector);
    body.restaurant_id = +(yield select(managedRestaurantIdSelector));

    const category = yield call(createCategorySaga, { payload: body });

    yield put(setCategoryModal({ categoryId: category.id }));
    yield put(
      showToast({ text: 'The category created successful', type: 'success' }),
    );
  } catch (error) {
    console.error(error);
    yield put(
      showToast({
        text: 'Some error occured while creating category',
        type: 'error',
      }),
    );
  }
}

function* updateCategoryFromModalSaga() {
  try {
    const payload = yield select(categoryInfoFormValuesSelector);
    payload.restaurant_id = +(yield select(managedRestaurantIdSelector));
    payload.id = yield select(managedCategoryIdSelector);

    yield call(updateCategorySaga, { payload });

    yield put(
      showToast({
        text: 'The category info updated successful',
        type: 'success',
      }),
    );
  } catch (error) {
    console.error(error);
    yield put(
      showToast({
        text: 'Some error occured while updating category',
        type: 'error',
      }),
    );
  }
}

function* patchCategoryExtrasFromModalSaga() {
  try {
    const categoryId = yield select(managedCategoryIdSelector);
    const extrasPayload = yield select(extrasFormValuesSelector);

    const payload = { categoryId, extrasPayload };

    yield call(patchCategoryExtrasSaga, { payload });
    yield put(
      showToast({
        text: 'The category extras saved successful',
        type: 'success',
      }),
    );
    yield put(reset(EXTRAS_FORM));
  } catch (e) {
    console.error(e);
    yield put(
      showToast({
        text: 'Some error occured while saving category extras',
        type: 'error',
      }),
    );
  }
}

function* resetCategoryModalFormsSaga() {
  yield all([
    put(reset(CATEGORY_INFO_FORM)),
    put(reset(SIZES_FORM)),
    put(reset(EXTRAS_FORM)),
    put(setCategoryModal({ activeStep: 0 })),
  ]);
}

export function* categoryCreationModalSaga() {
  yield all([
    takeLatest(CATEGORY_MODAL__RESET_FORMS, resetCategoryModalFormsSaga),
    takeLatest(CATEGORY_MODAL__FULLY_CLEAR, resetCategoryModalFormsSaga),
    takeLatest(CATEGORY_MODAL__CREATE, createCategoryFromModalSaga),
    takeLatest(CATEGORY_MODAL__UPDATE_INFO, updateCategoryFromModalSaga),
    takeLatest(CATEGORY_MODAL__PATCH_EXTRAS, patchCategoryExtrasFromModalSaga),
  ]);
}

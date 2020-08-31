import { takeLatest, all, put, select, call } from 'redux-saga/effects';
import { reset, destroy } from 'redux-form';
import {
  DISH_MODAL__CREATE,
  DISH_MODAL__UPDATE_INFO,
  DISH_MODAL__RESET_FORMS,
  DISH_MODAL__PATCH_EXTRAS,
  DISH_MODAL__PATCH_SIZES,
  DISH_MODAL__FULLY_CLEAR,
} from './dish-modal.types';

import {
  SIZES_FORM,
  EXTRAS_FORM,
  DISH_INFO_FORM,
} from '../../../components/forms/constants/form.names';

import {
  updateDishSaga,
  patchDishExtrasSaga,
  patchDishSizesSaga,
  createDishSaga,
  dishListFiltersSelector,
} from '../../dishes';

import {
  dishInfoFormValuesSelector,
  extrasFormValuesSelector,
  sizesFormValuesSelector,
} from '../../../components/forms/selectors';

import { setDishModal } from './dish-modal.actions';
import { showToast } from '../../../scenes/Toasts/modules';
import { managedDishIdSelector } from './dish-modal.selectors';

function* createDishFromModalSaga() {
  try {
    const body = yield select(dishInfoFormValuesSelector);
    const filters = yield select(dishListFiltersSelector);

    body.category_id = filters.category_id;

    const dish = yield call(createDishSaga, { payload: body });

    yield put(setDishModal({ dishId: dish.id }));
    yield put(
      showToast({ text: 'The dish created successful', type: 'success' }),
    );
    yield put(reset(DISH_INFO_FORM));
  } catch (error) {
    console.error(error);
    yield put(
      showToast({
        text: 'Some error occured while dish creating',
        type: 'error',
      }),
    );
  }
}

function* updateDishFromModalSaga() {
  try {
    const payload = yield select(dishInfoFormValuesSelector);
    const id = yield select(managedDishIdSelector);
    const filters = yield select(dishListFiltersSelector);

    payload.category_id = filters.category_id;
    payload.id = id;

    yield call(updateDishSaga, { payload });

    yield put(
      showToast({ text: 'The dish updated successful', type: 'success' }),
    );
  } catch (error) {
    console.error(error);
    yield put(
      showToast({
        text: 'Some error occured while dish updating',
        type: 'error',
      }),
    );
  }
}

function* patchDishExtrasFromModalSaga() {
  try {
    const dishId = yield select(managedDishIdSelector);
    const extrasPayload = yield select(extrasFormValuesSelector);

    const payload = { dishId, extrasPayload };

    yield call(patchDishExtrasSaga, { payload });
    yield put(
      showToast({ text: 'The dish extras saved successful', type: 'success' }),
    );
    yield put(reset(EXTRAS_FORM));
  } catch (e) {
    console.error(e);
    yield put(
      showToast({
        text: 'Some error occured while saving dish extras',
        type: 'error',
      }),
    );
  }
}

function* patchDishSizesFromModalSaga() {
  try {
    const dishId = yield select(managedDishIdSelector);
    const items = yield select(sizesFormValuesSelector);
    const filters = yield select(dishListFiltersSelector);

    const sizesPayload = {
      category_id: filters.category_id,
      items,
    };

    const payload = { dishId, sizesPayload };

    yield call(patchDishSizesSaga, { payload });
    yield put(
      showToast({ text: 'The dish sizes saved successful', type: 'success' }),
    );
    yield put(reset(SIZES_FORM));
  } catch (e) {
    console.error(e);
    yield put(
      showToast({
        text: 'Some error occured while saving dish sizes',
        type: 'error',
      }),
    );
  }
}

function* resetDishModalFormsSaga() {
  yield all([
    put(reset(DISH_INFO_FORM)),
    put(reset(SIZES_FORM)),
    put(reset(EXTRAS_FORM)),
    put(setDishModal({ activeStep: 0 })),
  ]);
}

function* destroyDishModalFormsSaga() {
  yield put(destroy(DISH_INFO_FORM, SIZES_FORM, EXTRAS_FORM));
}

export function* dishModalSaga() {
  yield all([
    takeLatest(DISH_MODAL__RESET_FORMS, resetDishModalFormsSaga),
    takeLatest(DISH_MODAL__FULLY_CLEAR, destroyDishModalFormsSaga),
    takeLatest(DISH_MODAL__CREATE, createDishFromModalSaga),
    takeLatest(DISH_MODAL__UPDATE_INFO, updateDishFromModalSaga),
    takeLatest(DISH_MODAL__PATCH_EXTRAS, patchDishExtrasFromModalSaga),
    takeLatest(DISH_MODAL__PATCH_SIZES, patchDishSizesFromModalSaga),
  ]);
}

import { takeLatest, all, put, select } from 'redux-saga/effects';
import {
  DISH_ORDER_MODAL__TRIGGER_PUT_ITEM_TO_CHECKOUT,
  DISH_ORDER_MODAL__TRIGGER_UPDATING_CHECKOUT_ITEM,
} from './dish-order-modal.types';

import { orderItemFormValuesSelector } from '../../../components/forms/selectors';
import { closeDishOrderModal } from './dish-order-modal.actions';
import { putItemToCheckout, updateCheckoutItem } from '../../checkout';
import { showToast } from '../../../scenes/Toasts/modules';

function* putItemToCheckoutSaga() {
  try {
    const item = yield select(orderItemFormValuesSelector);

    const withDishId = { ...item };

    if (!withDishId.dish_id) {
      withDishId.dish_id = withDishId.id;
    }

    yield put(putItemToCheckout(withDishId));
    yield put(closeDishOrderModal());
  } catch (error) {
    console.error(error);
    yield put(
      showToast({
        text: 'Some error occured while creating checkout item',
        type: 'error',
      }),
    );
  }
}

function* updateCheckoutItemSaga() {
  try {
    const item = yield select(orderItemFormValuesSelector);

    const newItem = { ...item };

    if (newItem.selectedSize && typeof newItem.selectedSize === 'object') {
      newItem.selectedSize = newItem.selectedSize.id;
    }

    yield put(updateCheckoutItem(newItem));
    yield put(closeDishOrderModal());
  } catch (error) {
    console.error(error);
    yield put(
      showToast({
        text: 'Some error occured while updating checkout item',
        type: 'error',
      }),
    );
  }
}

export function* dishOrderModalSaga() {
  yield all([
    takeLatest(
      DISH_ORDER_MODAL__TRIGGER_PUT_ITEM_TO_CHECKOUT,
      putItemToCheckoutSaga,
    ),
    takeLatest(
      DISH_ORDER_MODAL__TRIGGER_UPDATING_CHECKOUT_ITEM,
      updateCheckoutItemSaga,
    ),
  ]);
}

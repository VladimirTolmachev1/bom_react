import { takeLatest, all, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import uuid from 'uuid/v4';

import { DateTimeService } from '../../services';
import { CHECKOUT_MAX_LIVE_DAYS_IN_STORAGE } from './checkout.constants';
import {
  generateCkeckoutStorageKeyByRestaurantId,
  getUnicOrderItemDescriptor,
} from './checkout.helpers';
import {
  CHECKOUT__PUT_ITEM,
  CHECKOUT__SAVE_TO_STORAGE,
  CHECKOUT__BACK_TO_RESTAURANT_MENU,
  CHECKOUT__BULK_CREATE_CHECKOUT_ITEMS,
} from './checkout.types';

import {
  GET_RESTAURANT_FOR_CLIENT_SUCCESS,
  managedRestaurantIdSelector,
} from '../restaurants';

import {
  createNewCheckoutItem,
  increaseCheckoutItemAmountBy,
  restoreCheckoutFromStorage,
  setCheckoutUi,
  bulkSaveCheckout,
} from './checkout.actions';

import { uuidsByItemDecriptorsSelector } from './checkout.selectors';

function* checkoutItemCreationSaga({ payload: item }) {
  try {
    const uuidsByDescriptors = yield select(uuidsByItemDecriptorsSelector);

    const descriptor = getUnicOrderItemDescriptor(item);
    const itemUuid = uuidsByDescriptors[descriptor];

    if (itemUuid) {
      yield put(increaseCheckoutItemAmountBy(itemUuid, 1));
      return;
    }

    const resultItem = {
      ...item,
      descriptor,
      uuid: uuid(),
    };

    resultItem.dish_id = resultItem.id;

    delete resultItem.id;
    delete resultItem.selectedExtras;

    yield put(createNewCheckoutItem(resultItem));
  } catch (error) {
    console.error(error);
  }
}

function* builkItemsCreationSaga({ payload: items }) {
  const itemsByUuids = {};
  const allUuids = [];
  const uuidsByItemDecriptors = {};

  let newItem;
  let descriptor;

  items.forEach(item => {
    descriptor = getUnicOrderItemDescriptor(item);

    newItem = {
      ...item,
      uuid: uuid(),
      descriptor,
    };

    if (item.selectedExtras) {
      newItem.extras = item.selectedExtras.map(extra => ({
        ...extra,
        selected: true,
      }));
    }

    itemsByUuids[newItem.uuid] = newItem;
    allUuids.push(newItem.uuid);
    uuidsByItemDecriptors[descriptor] = newItem.uuid;
  });

  yield put(
    bulkSaveCheckout({
      itemsByUuids,
      allUuids,
      uuidsByItemDecriptors,
    }),
  );
}

function* savingCheckoutToStorage({ payload: { checkout } }) {
  const restaurantId = yield select(managedRestaurantIdSelector);
  const timestamp = Date.now();

  const key = generateCkeckoutStorageKeyByRestaurantId(restaurantId);
  const value = JSON.stringify({
    checkout,
    restaurantId,
    timestamp,
  });

  localStorage.setItem(key, value);
}

function* checkoutRestoring(action) {
  const { id } = action.payload;
  const key = generateCkeckoutStorageKeyByRestaurantId(id);
  const checkoutJsonObject = localStorage.getItem(key);

  if (!checkoutJsonObject) {
    return;
  }

  const latestCheckout = JSON.parse(checkoutJsonObject);
  const oldTimestamp = new Date(latestCheckout.timestamp);
  const newTimestamp = new Date();
  const differenceInDays = DateTimeService.daysBetween(
    oldTimestamp,
    newTimestamp,
    { abs: true },
  );

  if (differenceInDays > CHECKOUT_MAX_LIVE_DAYS_IN_STORAGE) {
    localStorage.removeItem(key);
  } else {
    yield put(restoreCheckoutFromStorage(latestCheckout.checkout));
  }
}

function* backToMenuSaga({ payload }) {
  yield all([
    put(push(payload.restaurantLink)),
    put(setCheckoutUi({ activeStep: 0 })),
  ]);
}

export function* checkoutSaga() {
  yield all([
    takeLatest(CHECKOUT__PUT_ITEM, checkoutItemCreationSaga),
    takeLatest(CHECKOUT__SAVE_TO_STORAGE, savingCheckoutToStorage),
    takeLatest(GET_RESTAURANT_FOR_CLIENT_SUCCESS, checkoutRestoring),
    takeLatest(CHECKOUT__BACK_TO_RESTAURANT_MENU, backToMenuSaga),
    takeLatest(CHECKOUT__BULK_CREATE_CHECKOUT_ITEMS, builkItemsCreationSaga),
  ]);
}

import { takeLatest, all, put, select, call } from 'redux-saga/effects';
import { destroy } from 'redux-form';

import {
  RESTAURATOR_ORDER_MODAL__OPEN_EDITING,
  RESTAURATOR_ORDER_MODAL__OPEN_ORDER_ITEM_FOR_EDITING,
  RESTAURATOR_ORDER_MODAL__OPEN_ORDER_ITEM_CREATION_MODAL,
  RESTAURATOR_ORDER_MODAL__TRIGGER_ADD_ITEM_TO_ORDER,
  RESTAURATOR_ORDER_MODAL__CREATE_ORDER,
  RESTAURATOR_ORDER_MODAL__UPDATE_ORDER,
  RESTAURATOR_ORDER_MODAL__CLOSE,
} from './restaurator-order-modal.types';
import {
  bulkCreateCheckoutItems,
  updateCheckoutItem,
  putItemToCheckout,
  checkoutItemsForPaymentsSelector,
  totalPriceSelector,
  clearCheckout,
} from '../../checkout';
import {
  ordersByIdsSelector,
  updateOrderSaga,
  orderCreatingSaga,
} from '../../orders';
import { setDishOrderModal, closeDishOrderModal } from '../dish-order';
import { getDishByIdSaga } from '../../dishes';
import { showToast } from '../../../scenes/Toasts/modules';
import {
  orderItemFormValuesSelector,
  clientInfoFormValuesSelector,
} from '../../../components/forms/selectors';
import { activeOrderIdSelector } from './restaurator-order-modal.selectors';
import { closeRestauratorOrderModal } from './restaurator-order-modal.actions';
import { CLIENT_INFO_FORM } from '../../../components/forms/constants/form.names';

function convertExtrasToSelected(all, selected) {
  if (!(selected || []).length) {
    return;
  }

  // TODO: check for mutation
  all.forEach(extra => {
    const selectedItem = selected.find(({ id }) => id === extra.id);

    if (selectedItem) {
      extra.selected = true;
      extra.amount = selectedItem.amount;
    }
  });
}

const markSelectedSizesIfPresent = item => {
  if (!item.selectedSize) {
    return;
  }

  item.selectedSize = item.selectedSize.id;
};

const markSelectedExtrasInExtraLists = item => {
  if (!(item.selectedExtras || []).length || !(item.extra_lists || []).length) {
    return;
  }

  item.extra_lists.forEach(list => {
    if (list.multi_selection) {
      convertExtrasToSelected(list.items, item.selectedExtras);
    } else {
      const extra = list.items.find(({ id }) =>
        item.selectedExtras.some(extra => extra.id === id),
      );
      if (extra) {
        list.selectedExtra = extra.id;
      }
    }
  });
};

function* createOrderFromRestauratorModalSaga() {
  try {
    const paymentDetails = yield select(clientInfoFormValuesSelector);
    const price = yield select(totalPriceSelector);

    const payload = {
      paymentDetails: { ...paymentDetails, total_price: price.total },
    };
    yield call(orderCreatingSaga, { payload });
    yield put(closeRestauratorOrderModal());
  } catch (error) {
    yield put(
      showToast({
        text: 'SOme error occurred while order creation',
        type: 'error',
      }),
    );
  }
}

function* handleOpenOrderEditingModalSaga({ payload }) {
  const ordersByIds = yield select(ordersByIdsSelector);

  const order = ordersByIds[payload.orderId];

  yield put(bulkCreateCheckoutItems(order.products));
}

function* addItemToOrderSaga() {
  try {
    const dish = yield select(orderItemFormValuesSelector);

    const item = { ...dish };

    if (item.selectedSize && typeof item.selectedSize === 'object') {
      item.selectedSize = item.selectedSize.id;
    }

    item.isAlreadyOpenedForEditingBefore = true;

    yield put(putItemToCheckout(item));
    yield put(closeDishOrderModal());
  } catch (error) {
    console.error(error);
    yield put(
      showToast({
        text: 'Some error occurred while creating checkout item',
        type: 'error',
      }),
    );
  }
}

function* openOrderItemCreationModalSaga({ payload: { dishId } }) {
  yield put(
    setDishOrderModal({
      open: true,
      isLoading: true,
      id: dishId,
    }),
  );

  yield call(getDishByIdSaga, { payload: dishId });

  yield put(setDishOrderModal({ isLoading: false }));
}

function* restauratorOrderModalCloseSaga() {
  yield all([put(destroy(CLIENT_INFO_FORM)), put(clearCheckout())]);
}

function* openOrderItemForEditingSaga({ payload: { item } }) {
  yield put(
    setDishOrderModal({
      open: true,
      isEditing: true,
      isLoading: true,
      id: item.uuid,
    }),
  );

  if (item.isAlreadyOpenedForEditingBefore) {
    yield put(
      setDishOrderModal({
        isLoading: false,
      }),
    );

    return;
  }

  const dish = yield call(getDishByIdSaga, { payload: item.dish_id });

  const itemWithAllAvailableSizesAndExtras = {
    ...item,
    extra_lists: dish.extra_lists,
    sizes: dish.sizes,
    extras: dish.extras,

    isAlreadyOpenedForEditingBefore: true,
  };

  markSelectedExtrasInExtraLists(itemWithAllAvailableSizesAndExtras);
  markSelectedSizesIfPresent(itemWithAllAvailableSizesAndExtras);

  convertExtrasToSelected(
    itemWithAllAvailableSizesAndExtras.extras,
    itemWithAllAvailableSizesAndExtras.selectedExtras,
  );

  yield put(updateCheckoutItem(itemWithAllAvailableSizesAndExtras));

  yield put(setDishOrderModal({ isLoading: false }));
}

function* triggerOrderUpdatingSaga() {
  const clientInfoValues = yield select(clientInfoFormValuesSelector);
  const orderProductsValues = yield select(checkoutItemsForPaymentsSelector);
  const price = yield select(totalPriceSelector);
  const id = yield select(activeOrderIdSelector);

  const payload = {
    ...clientInfoValues,
    total_price: price.total,
    products: orderProductsValues,
    id,
  };

  try {
    yield call(updateOrderSaga, { payload });
    yield put(closeRestauratorOrderModal());
  } catch (e) {
    yield put(
      showToast({
        text: 'Some error occurred while order updating',
        type: 'error',
      }),
    );
  }
}

export function* restauratorOrderModalSaga() {
  yield all([
    takeLatest(
      RESTAURATOR_ORDER_MODAL__OPEN_EDITING,
      handleOpenOrderEditingModalSaga,
    ),
    takeLatest(RESTAURATOR_ORDER_MODAL__CLOSE, restauratorOrderModalCloseSaga),
    takeLatest(
      RESTAURATOR_ORDER_MODAL__OPEN_ORDER_ITEM_FOR_EDITING,
      openOrderItemForEditingSaga,
    ),
    takeLatest(
      RESTAURATOR_ORDER_MODAL__OPEN_ORDER_ITEM_CREATION_MODAL,
      openOrderItemCreationModalSaga,
    ),
    takeLatest(
      RESTAURATOR_ORDER_MODAL__TRIGGER_ADD_ITEM_TO_ORDER,
      addItemToOrderSaga,
    ),
    takeLatest(RESTAURATOR_ORDER_MODAL__UPDATE_ORDER, triggerOrderUpdatingSaga),
    takeLatest(
      RESTAURATOR_ORDER_MODAL__CREATE_ORDER,
      createOrderFromRestauratorModalSaga,
    ),
  ]);
}

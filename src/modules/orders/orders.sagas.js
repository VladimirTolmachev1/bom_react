import { takeLatest, all, call, put, select } from 'redux-saga/effects';

import {
  CHECKOUT__CREATE_ORDER_REQUEST,
  GET_ORDERS_TOTAL_INFO_REQUEST,
  GET_ORDER_BY_ID_REQUEST,
  UPDATE_ORDER_REQUEST,
  GET_ORDERS_REQUEST,
  COMPLETE_ORDER,
} from './orders.types';
import { orderStatuses } from '../../constants/orders';
import * as actions from './orders.actions';
import { normalizeOrders } from './orders.helpers';
import OrdersApiService from './orders.api.service';
import {
  orderByIdFromPropsSelector,
  ordersTotalInfoSelector,
} from './orders.selectors';
import { managedRestaurantIdSelector } from '../restaurants';

import {
  stripeChargeTransactionIdSelector,
  checkoutItemsForPaymentsSelector,
  clearCheckout,
  setCheckoutUi,
  checkoutStepsValues,
} from '../checkout';

function* getOrderByIdSaga({ payload }) {
  try {
    const { data: order } = yield call(OrdersApiService.getById, payload);
    yield put(actions.getOrderByIdSuccess(order));
  } catch (e) {
    console.error(e);
    yield put(actions.getOrderByIdError());
  }
}

export function* updateOrderSaga({ payload }) {
  try {
    const { data: order } = yield call(OrdersApiService.patch, payload);

    yield put(actions.updateOrderSuccess(order));
  } catch (e) {
    console.error(e);
    yield put(actions.updateOrderError());
    return Promise.reject(e);
  }
}

function* completeOrderSaga({ payload: { id } }) {
  try {
    const updatePayload = {
      id,
      status: orderStatuses.COMPLETE,
    };

    yield call(updateOrderSaga, { payload: updatePayload });

    const order = yield select(orderByIdFromPropsSelector, { orderId: id });
    const { ordersCompleted, revenue } = yield select(ordersTotalInfoSelector);

    const newRevenue = revenue + order.total_price;
    const newOrdersCompleted = ordersCompleted + 1;

    yield put(actions.setOrdersTotal({ newRevenue, newOrdersCompleted }));
  } catch (e) {
    console.error(e);
  }
}

function* getOrdersSaga({ payload }) {
  try {
    const { params } = payload;
    const { data: resData } = yield call(OrdersApiService.get, { params });
    const { byId, allIds } = normalizeOrders(resData.data);

    yield put(
      actions.getOrdersSuccess({
        count: resData.count,
        byId,
        allIds,
      }),
    );
  } catch (e) {
    console.error(e);
    yield put(actions.getOrdersError(e));
  }
}

export function* orderCreatingSaga({ payload }) {
  try {
    const body = payload.paymentDetails;
    const products = yield select(checkoutItemsForPaymentsSelector);

    const restaurantId = yield select(managedRestaurantIdSelector);
    const transactionId = yield select(stripeChargeTransactionIdSelector);

    body.products = products;
    body.restaurant_id = restaurantId;
    body.transaction_id = transactionId;

    const { data: newOrder } = yield call(OrdersApiService.create, body);

    yield put(actions.createOrderSuccess(newOrder));
    yield put(clearCheckout());
  } catch (e) {
    console.error(e);
    yield put(actions.createOrderError(e));
    return Promise.reject(e);
  }
}

function* ordersTotalInfoSaga({ payload }) {
  try {
    const { data } = yield call(OrdersApiService.getTotalInfo, payload);
    yield put(actions.getOrdersTotalInfoSuccess(data));
  } catch (e) {
    console.error(e);
    yield put(actions.getOrdersTotalInfoError(e));
  }
}

function* orderCreationgFromCheckoutSaga(action) {
  try {
    yield call(orderCreatingSaga, action);
    yield put(setCheckoutUi({ activeStep: checkoutStepsValues.ORDER_PLACED }));
  } catch (e) {
    console.error(e);
  }
}

export function* ordersSaga() {
  yield all([
    takeLatest(CHECKOUT__CREATE_ORDER_REQUEST, orderCreationgFromCheckoutSaga),
    takeLatest(GET_ORDERS_TOTAL_INFO_REQUEST, ordersTotalInfoSaga),
    takeLatest(GET_ORDER_BY_ID_REQUEST, getOrderByIdSaga),
    takeLatest(UPDATE_ORDER_REQUEST, updateOrderSaga),
    takeLatest(GET_ORDERS_REQUEST, getOrdersSaga),
    takeLatest(COMPLETE_ORDER, completeOrderSaga),
  ]);
}

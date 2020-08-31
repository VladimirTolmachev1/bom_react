import { createActionCreator } from '../../helpers';

import {
  SET_UPDATED_ORDER_IN_STORE_DIRECTLY,
  CHECKOUT__CREATE_ORDER_REQUEST,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_ERROR,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_ERROR,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_BY_ID_ERROR,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_ERROR,
  GET_ORDERS_TOTAL_INFO_REQUEST,
  GET_ORDERS_TOTAL_INFO_SUCCESS,
  GET_ORDERS_TOTAL_INFO_ERROR,
  SET_ORDERS_TOTAL,
  COMPLETE_ORDER,
} from './orders.types';

export const setUpdatedOrderInStore = createActionCreator(
  SET_UPDATED_ORDER_IN_STORE_DIRECTLY,
);

export const createOrderFromCheckout = createActionCreator(
  CHECKOUT__CREATE_ORDER_REQUEST,
);

export const getOrdersTotalInfo = createActionCreator(
  GET_ORDERS_TOTAL_INFO_REQUEST,
);
export const getOrdersTotalInfoSuccess = createActionCreator(
  GET_ORDERS_TOTAL_INFO_SUCCESS,
);
export const getOrdersTotalInfoError = createActionCreator(
  GET_ORDERS_TOTAL_INFO_ERROR,
);
export const setOrdersTotal = createActionCreator(SET_ORDERS_TOTAL);

export const updateOrder = createActionCreator(UPDATE_ORDER_REQUEST);
export const updateOrderSuccess = createActionCreator(UPDATE_ORDER_SUCCESS);
export const updateOrderError = createActionCreator(UPDATE_ORDER_ERROR);

export const getOrderById = createActionCreator(GET_ORDER_BY_ID_REQUEST);
export const getOrderByIdSuccess = createActionCreator(GET_ORDER_BY_ID_SUCCESS);
export const getOrderByIdError = createActionCreator(GET_ORDER_BY_ID_ERROR);

export const getOrders = createActionCreator(GET_ORDERS_REQUEST);
export const getOrdersSuccess = createActionCreator(GET_ORDERS_SUCCESS);
export const getOrdersError = createActionCreator(GET_ORDERS_ERROR);

export const createOrder = createActionCreator(CREATE_ORDER_REQUEST);
export const createOrderSuccess = createActionCreator(CREATE_ORDER_SUCCESS);
export const createOrderError = createActionCreator(CREATE_ORDER_ERROR);
export const completeOrder = createActionCreator(COMPLETE_ORDER);

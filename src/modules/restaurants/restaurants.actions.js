import { API_REQUESTS_ABORT } from '../core';
import { CALL_API } from '../../store/middleware/api';
import { ReduxCrudService } from '../../services';

import {
  resource,
  BLOCK_RESTAURANT_REQUEST,
  BLOCK_RESTAURANT_SUCCESS,
  BLOCK_RESTAURANT_ERROR,
  CLEANUP_RESTAURANTS_PAGE,
  RESTAURANTS_LIST_FILTERS_CHANGED,
  RESTAURANTS_LIST_FILTERS_CLEAR,
  CREATE_RESTAURANT_REQUEST,
  UPDATE_RESTAURANT_REQUEST,
  GET_RESTAURANTS_LIST_REQUEST,
  GET_RESTAURANT_BY_ID_REQUEST,
  RESTAURANTS__CLEAR_MANAGED_RESTAURANT,
  RESTAURANTS__SET_MANAGED_RESTAURANT,
  GET_RESTAURANT_FOR_CLIENT_REQUEST,
  GET_RESTAURANT_FOR_CLIENT_SUCCESS,
  GET_RESTAURANT_FOR_CLIENT_ERROR,
} from './restaurants.types';

export const getRestaurantForClient = url => ({
  type: GET_RESTAURANT_FOR_CLIENT_REQUEST,
  payload: url,
});

export const getRestaurantForClientSuccess = restaurant => ({
  type: GET_RESTAURANT_FOR_CLIENT_SUCCESS,
  payload: restaurant,
});

export const getRestaurantForClientError = error => ({
  type: GET_RESTAURANT_FOR_CLIENT_ERROR,
  payload: error,
});

export const clearManagedRestaurant = () => ({
  type: RESTAURANTS__CLEAR_MANAGED_RESTAURANT,
});

export const setManagedRestaurant = payload => ({
  type: RESTAURANTS__SET_MANAGED_RESTAURANT,
  payload,
});

export const getRestaurants = ReduxCrudService.resourceAction({
  resource,
  method: 'GET',
});

export const getRestaurantById = ReduxCrudService.resourceAction({
  resource,
  method: 'GET',
  byId: true,
});

export const createRestaurant = ReduxCrudService.resourceAction({
  resource,
  method: 'POST',
  logger: {
    success: 'Restaurant was successful created',
    error: 'Error during restaurant creation',
  },
});

export const updateRestaurant = ReduxCrudService.resourceAction({
  resource,
  method: 'PATCH',
  logger: {
    success: 'Restaurant was successful updated',
    error: 'Error during restaurant update',
  },
});

export const deleteRestaurant = ReduxCrudService.resourceAction({
  resource,
  method: 'DELETE',
  logger: {
    success: 'Restaurant was successful deleted',
    error: 'Error during restaurant delete',
  },
});

export function blockRestaurant(body) {
  return {
    type: CALL_API,
    request: {
      method: 'POST',
      endpoint: '/restaurant/block',
      types: [
        BLOCK_RESTAURANT_REQUEST,
        BLOCK_RESTAURANT_SUCCESS,
        BLOCK_RESTAURANT_ERROR,
      ],
      logger: {
        success: 'Restaurant was successfully blocked',
        error: 'Error during restaurant blocking',
      },
      body,
      // then: window.location.reload()
    },
  };
}

export function updateFilters(filters) {
  return {
    type: RESTAURANTS_LIST_FILTERS_CHANGED,
    filters,
  };
}

export function clearFilters() {
  return {
    type: RESTAURANTS_LIST_FILTERS_CLEAR,
  };
}

export function cleanup() {
  return {
    type: CLEANUP_RESTAURANTS_PAGE,
  };
}

export function abortPageRequests() {
  return {
    type: API_REQUESTS_ABORT,
    requestTypes: [
      GET_RESTAURANTS_LIST_REQUEST,
      CREATE_RESTAURANT_REQUEST,
      GET_RESTAURANT_BY_ID_REQUEST,
      UPDATE_RESTAURANT_REQUEST,
    ],
  };
}

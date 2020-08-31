import { normalize } from 'normalizr';

import { CALL_API } from '../../store/middleware/api';
import { dishesSchema } from './dishes.schemas';
import { API_REQUESTS_ABORT } from '../core';
import { ReduxCrudService } from '../../services';
import {
  resource,
  PUBLISH_DISH_REQUEST,
  PUBLISH_DISH_SUCCESS,
  PUBLISH_DISH_ERROR,
  UNPUBLISH_DISH_REQUEST,
  UNPUBLISH_DISH_SUCCESS,
  UNPUBLISH_DISH_ERROR,
  CHANGE_DICHES_ORDERING,
  CLEAN_DISH_LIST,
  SET_DISH_FILTERS,
  SET_DISH_PAGE,
  CLEANUP_DISH,
  GET_DISH_LIST_REQUEST,
  GET_DISH_BY_ID_REQUEST,
  UPDATE_DISH_REQUEST,
  UPDATE_DISH_SUCCESS,
  UPDATE_DISH_ERROR,
  PATCH_DISH_EXTRAS_REQUEST,
  PATCH_DISH_EXTRAS_SUCCESS,
  PATCH_DISH_EXTRAS_ERROR,
  PATCH_DISH_SIZES_REQUEST,
  PATCH_DISH_SIZES_SUCCESS,
  PATCH_DISH_SIZES_ERROR,
  CREATE_DISH_REQUEST,
  CREATE_DISH_SUCCESS,
  CREATE_DISH_ERROR,
  DISHES__GET_BY_ID_REQUEST,
  DISHES__GET_BY_ID_SUCCESS,
  DISHES__GET_BY_ID_ERROR,
} from './dishes.types';

export const changeDishesOrdering = idsWithOrder => ({
  type: CHANGE_DICHES_ORDERING,
  payload: { idsWithOrder },
});

export const getDishes = ReduxCrudService.resourceAction({
  resource,
  method: 'GET',
  responseConverter: res => {
    const {
      entities: { dishes },
      result,
    } = normalize(res.data, dishesSchema);

    return {
      ...res,
      byId: dishes,
      allIds: result,
    };
  },
});

export const getDishById = id => ({
  type: DISHES__GET_BY_ID_REQUEST,
  payload: id,
});

export const getDishByIdSuccess = dish => ({
  type: DISHES__GET_BY_ID_SUCCESS,
  payload: dish,
});

export const getDishByIdError = error => ({
  type: DISHES__GET_BY_ID_ERROR,
  payload: error,
});

export const patchDishExtras = (categoryId, extras) => ({
  type: PATCH_DISH_EXTRAS_REQUEST,
  payload: { categoryId, extras },
});

export const patchDishExtrasSuccess = payload => ({
  type: PATCH_DISH_EXTRAS_SUCCESS,
  payload,
});

export const patchDishExtrasError = payload => ({
  type: PATCH_DISH_EXTRAS_ERROR,
  payload,
});

// SIZES
export const patchDishSizes = (categoryId, extras) => ({
  type: PATCH_DISH_SIZES_REQUEST,
  payload: { categoryId, extras },
});

export const patchDishSizesSuccess = payload => ({
  type: PATCH_DISH_SIZES_SUCCESS,
  payload,
});

export const patchDishSizesError = payload => ({
  type: PATCH_DISH_SIZES_ERROR,
  payload,
});

// CREATE DISH
export const createDish = payload => ({
  type: CREATE_DISH_REQUEST,
  payload,
});

export const createDishSuccess = newDish => ({
  type: CREATE_DISH_SUCCESS,
  payload: newDish,
});

export const createDishError = error => ({
  type: CREATE_DISH_ERROR,
  payload: error,
});

// UPDATE DISH
export const updateDish = payload => ({
  type: UPDATE_DISH_REQUEST,
  payload,
});

export const updateDishSuccess = updatedDish => ({
  type: UPDATE_DISH_SUCCESS,
  payload: updatedDish,
});

export const updateDishError = error => ({
  type: UPDATE_DISH_ERROR,
  payload: error,
});

// export const getDishById = ReduxCrudService.resourceAction({
//     resource,
//     method: 'GET',
//     byId: true
// });

export const removeDish = ReduxCrudService.resourceAction({
  resource,
  method: 'DELETE',
  logger: {
    success: 'Dish was successful deleted',
    error: 'Error during dish delete',
  },
});

export function publishDishes(body) {
  return {
    type: CALL_API,
    request: {
      endpoint: `${resource}/publish`,
      method: 'POST',
      logger: {
        success: 'Publishing was success',
        error: 'Error during publishing',
      },
      types: [PUBLISH_DISH_REQUEST, PUBLISH_DISH_SUCCESS, PUBLISH_DISH_ERROR],
      body,
    },
  };
}

export function unpublishDishes(body) {
  return {
    type: CALL_API,
    request: {
      endpoint: `${resource}/unpublish`,
      method: 'POST',
      logger: {
        success: 'Unpublishing was success',
        error: 'Error during Unpublishing',
      },
      types: [
        UNPUBLISH_DISH_REQUEST,
        UNPUBLISH_DISH_SUCCESS,
        UNPUBLISH_DISH_ERROR,
      ],
      body,
    },
  };
}

export function updateDishFilters(filters) {
  return {
    type: SET_DISH_FILTERS,
    filters,
  };
}

export function setDishPage(page) {
  return {
    type: SET_DISH_PAGE,
    page,
  };
}

export function cleanupDish() {
  return {
    type: CLEANUP_DISH,
  };
}

export function abortPageRequests() {
  return {
    type: API_REQUESTS_ABORT,
    requestTypes: [
      GET_DISH_LIST_REQUEST,
      CREATE_DISH_REQUEST,
      GET_DISH_BY_ID_REQUEST,
      UPDATE_DISH_REQUEST,
    ],
  };
}

export function cleanDishList() {
  return {
    type: CLEAN_DISH_LIST,
  };
}

export const mapRetrievedDishArray = dishList =>
  dishList.map(dish => ({
    ...dish,
    selectedSize: (dish.sizes || []).length ? dish.sizes[0].id : null,
  }));

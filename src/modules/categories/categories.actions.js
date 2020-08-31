import { ReduxCrudService } from '../../services';
import { API_REQUESTS_ABORT } from '../core';

import {
  resource,
  SET_CATEGORY_FILTERS,
  CLEANUP_CATEGORIES,
  CHANGE_CATEGORIES_ORDERING,
  GET_CATEGORY_LIST_REQUEST,
  CREATE_CATEGORY_REQUEST,
  GET_CATEGORY_BY_ID_REQUEST,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_ERROR,
  PATCH_CATEGORY_EXTRAS_REQUEST,
  PATCH_CATEGORY_EXTRAS_SUCCESS,
  PATCH_CATEGORY_EXTRAS_ERROR,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_ERROR,
} from './categories.types';

export const changeCategoriesOrdering = idsWithOrder => ({
  type: CHANGE_CATEGORIES_ORDERING,
  payload: { idsWithOrder },
});

export const patchCategoryExtras = (categoryId, extras) => ({
  type: PATCH_CATEGORY_EXTRAS_REQUEST,
  payload: { categoryId, extras },
});

export const patchCategoryExtrasSuccess = payload => ({
  type: PATCH_CATEGORY_EXTRAS_SUCCESS,
  payload,
});

export const patchCategoryExtrasError = payload => ({
  type: PATCH_CATEGORY_EXTRAS_ERROR,
  payload,
});

// CREATE CATEGORY
export const createCategory = payload => ({
  type: CREATE_CATEGORY_REQUEST,
  payload,
});

export const createCategorySuccess = newCategory => ({
  type: CREATE_CATEGORY_SUCCESS,
  payload: newCategory,
});

export const createCategoryError = error => ({
  type: CREATE_CATEGORY_ERROR,
  payload: error,
});

// UPDATE CATEGORY
export const updateCategory = payload => ({
  type: UPDATE_CATEGORY_REQUEST,
  payload,
});

export const updateCategorySuccess = updatedCategory => ({
  type: UPDATE_CATEGORY_SUCCESS,
  payload: updatedCategory,
});

export const updateCategoryError = error => ({
  type: UPDATE_CATEGORY_ERROR,
  payload: error,
});

export const getCategories = ReduxCrudService.resourceAction({
  resource,
  method: 'GET',
});

export const getCategoryById = ReduxCrudService.resourceAction({
  resource,
  method: 'GET',
  byId: true,
});

export const deleteCategory = ReduxCrudService.resourceAction({
  resource,
  method: 'DELETE',
  logger: {
    success: 'Category was successful deleted',
    error: 'Error during category delete',
  },
});

export function updateCategoryFilters(filters) {
  return {
    type: SET_CATEGORY_FILTERS,
    filters,
  };
}

export function cleanupCategories() {
  return {
    type: CLEANUP_CATEGORIES,
  };
}

export function abortPageRequests() {
  return {
    type: API_REQUESTS_ABORT,
    requestTypes: [
      GET_CATEGORY_LIST_REQUEST,
      CREATE_CATEGORY_REQUEST,
      GET_CATEGORY_BY_ID_REQUEST,
      UPDATE_CATEGORY_REQUEST,
    ],
  };
}

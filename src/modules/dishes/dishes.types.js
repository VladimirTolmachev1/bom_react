import { ReduxCrudService } from '../../services';

export const resource = '/dish';

export const DISHES__GET_BY_ID_REQUEST = 'DISHES__GET_BY_ID_REQUEST';
export const DISHES__GET_BY_ID_SUCCESS = 'DISHES__GET_BY_ID_SUCCESS';
export const DISHES__GET_BY_ID_ERROR = 'DISHES__GET_BY_ID_ERROR';

export const PUBLISH_DISH_REQUEST = `${resource}/publish/request`;
export const PUBLISH_DISH_SUCCESS = `${resource}/publish/success`;
export const PUBLISH_DISH_ERROR = `${resource}/publish/error`;

export const UNPUBLISH_DISH_REQUEST = `${resource}/unpublish/request`;
export const UNPUBLISH_DISH_SUCCESS = `${resource}/unpublish/success`;
export const UNPUBLISH_DISH_ERROR = `${resource}/unpublish/error`;

export const SET_DISH_FILTERS = `${resource}/filters/changed`;
export const SET_DISH_PAGE = `${resource}/filters/set-page`;

export const CLEANUP_DISH = `${resource}/creanup`;
export const CLEAN_DISH_LIST = `${resource}/list/clean`;

export const CHANGE_DICHES_ORDERING = 'CHANGE_DICHES_ORDERING';

export const PATCH_DISH_EXTRAS_REQUEST = 'PATCH_DISH_EXTRAS_REQUEST';
export const PATCH_DISH_EXTRAS_SUCCESS = 'PATCH_DISH_EXTRAS_SUCCESS';
export const PATCH_DISH_EXTRAS_ERROR = 'PATCH_DISH_EXTRAS_ERROR';

export const PATCH_DISH_SIZES_REQUEST = 'PATCH_DISH_SIZES_REQUEST';
export const PATCH_DISH_SIZES_SUCCESS = 'PATCH_DISH_SIZES_SUCCESS';
export const PATCH_DISH_SIZES_ERROR = 'PATCH_DISH_SIZES_ERROR';

export const {
  GET: [GET_DISH_LIST_REQUEST, GET_DISH_LIST_SUCCESS, GET_DISH_LIST_ERROR],
  POST: [CREATE_DISH_REQUEST, CREATE_DISH_SUCCESS, CREATE_DISH_ERROR],
  GET_BY_ID: [
    GET_DISH_BY_ID_REQUEST,
    GET_DISH_BY_ID_SUCCESS,
    GET_DISH_BY_ID_ERROR,
  ],
  PATCH: [UPDATE_DISH_REQUEST, UPDATE_DISH_SUCCESS, UPDATE_DISH_ERROR],
  DELETE: [DELETE_DISH_REQUEST, DELETE_DISH_SUCCESS, DELETE_DISH_ERROR],
} = ReduxCrudService.getActionCrudTypes(resource);

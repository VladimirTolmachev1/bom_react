import { ReduxCrudService } from '../../services';
import {
  CREATE_RESTAURANT_SUCCESS,
  DELETE_RESTAURANT_SUCCESS,
} from '../../modules/restaurants';

import {
  DELETE_DISH_SUCCESS,
  PUBLISH_DISH_SUCCESS,
  UNPUBLISH_DISH_SUCCESS,
  CREATE_DISH_SUCCESS,
  // UPDATE_DISH_SUCCESS
} from '../../modules/dishes';

import {
  UPDATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_SUCCESS,
} from '../../modules/categories';

const syncActionTypesTriggers = [
  // restaurants
  CREATE_RESTAURANT_SUCCESS,
  DELETE_RESTAURANT_SUCCESS,

  // categories
  UPDATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_SUCCESS,

  // dishes
  DELETE_DISH_SUCCESS,
  PUBLISH_DISH_SUCCESS,
  UNPUBLISH_DISH_SUCCESS,
  CREATE_DISH_SUCCESS,
  // todo add dishes
];

export default store => next => action => {
  if (!syncActionTypesTriggers.includes(action.type)) {
    return next(action);
  }

  const resource = `/${action.type.split('/')[1]}`;
  const slice = store.getState()[resource];
  const body = slice.filters;

  const deleteActionTypesTriggers = syncActionTypesTriggers.filter(type =>
    type.includes('delete'),
  );

  if (deleteActionTypesTriggers.includes(action.type) && body) {
    body.page = 1;
    store.dispatch({
      type: `${resource}/filters/changed`,
      filters: body,
    });
  }

  // if dish list
  if (
    [
      PUBLISH_DISH_SUCCESS,
      UNPUBLISH_DISH_SUCCESS,
      CREATE_DISH_SUCCESS,
    ].includes(action.type)
  ) {
    body.page = 1;
    store.dispatch({
      type: `${resource}/filters/changed`,
      filters: body,
    });
  }

  store.dispatch(
    ReduxCrudService.resourceAction({ resource, method: 'GET' })({ body }),
  );

  return next(action);
};

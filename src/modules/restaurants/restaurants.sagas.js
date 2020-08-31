import { takeLatest, all, call, put } from 'redux-saga/effects';
import RestaurantsApiService from './restaurants.api.service';

import { setThemeColor } from '../core/core.actions';

import * as actions from './restaurants.actions';

import { GET_RESTAURANT_FOR_CLIENT_REQUEST } from './restaurants.types';

function* getRestaurantForClientSaga({ payload: url }) {
  try {
    const { data: restaurant } = yield call(
      RestaurantsApiService.getByUrlForClient,
      url,
    );

    const {
      menu_navigation_color,
      menu_background_color,
    } = restaurant.page_info;

    yield put(actions.getRestaurantForClientSuccess(restaurant));
    yield put(setThemeColor(menu_navigation_color, menu_background_color));
  } catch (error) {
    console.error(error);
    yield put(actions.getRestaurantForClientError(error));
  }
}

export function* restaurantsSaga() {
  yield all([
    takeLatest(GET_RESTAURANT_FOR_CLIENT_REQUEST, getRestaurantForClientSaga),
  ]);
}

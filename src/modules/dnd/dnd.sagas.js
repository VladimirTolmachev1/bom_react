import { takeLatest, all, put, select, call } from 'redux-saga/effects';
import DndApiService from './dnd.api.service';

import {
  DND_DRAG_END,
  MENU_RESTAURATOR__SAVE_MENU_ITEMS_REORDERING,
} from './dnd.types';

import {
  itemsByDroppableIdSelector,
  dndCategoriesSelector,
  dndDishesSelector,
} from './dnd.selectors';

import { authRestaurantIdSelector } from '../core';

import { dndItemsReordered, toggleDndModForDroppable } from './dnd.actions';

import { CATEGORIES_DROPPABLE, DISHES_DROPPABLE } from './dnd.constants';

import { changeCategoriesOrdering } from '../categories/categories.actions';
import { changeDishesOrdering } from '../dishes/dishes.actions';

import { reorder, mapToIdsAndOrderByIndex } from './dnd.helpers';

export function* handleEndDndSaga({ payload }) {
  const {
    dndResult: { destination, source },
  } = payload;

  if (
    !destination ||
    (destination.droppableId === source.droppableId &&
      destination.index === source.index)
  ) {
    return;
  }

  const items = yield select(
    itemsByDroppableIdSelector,
    destination.droppableId,
  );

  const reorderedItems = reorder(items, source.index, destination.index);

  yield put(dndItemsReordered(destination.droppableId, reorderedItems));
}

function* saveMenuItemsReorderingSaga() {
  const orderedDishes = yield select(dndDishesSelector);
  const orderedCategories = yield select(dndCategoriesSelector);
  const restaurnatId = yield select(authRestaurantIdSelector);

  const dishesOrder = orderedDishes.map(mapToIdsAndOrderByIndex);
  const categoriesOrder = orderedCategories.map(mapToIdsAndOrderByIndex);

  try {
    yield all([
      call(DndApiService.saveCategoriesOrder, categoriesOrder, restaurnatId),
      call(DndApiService.saveDishesOrder, dishesOrder, restaurnatId),
    ]);

    if (categoriesOrder.length) {
      yield put(changeCategoriesOrdering(categoriesOrder));
    }

    if (dishesOrder.length) {
      yield put(changeDishesOrdering(dishesOrder));
    }

    yield put(toggleDndModForDroppable(CATEGORIES_DROPPABLE));
    yield put(toggleDndModForDroppable(DISHES_DROPPABLE));
  } catch (error) {
    console.error(error);
  }
}

export function* dndSaga() {
  yield all([
    takeLatest(DND_DRAG_END, handleEndDndSaga),
    takeLatest(
      MENU_RESTAURATOR__SAVE_MENU_ITEMS_REORDERING,
      saveMenuItemsReorderingSaga,
    ),
  ]);
}

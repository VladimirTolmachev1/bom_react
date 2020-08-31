import { all, fork } from 'redux-saga/effects';

import { checkoutSaga } from '../modules/checkout';
import { dndSaga } from '../modules/dnd';
import { ordersSaga } from '../modules/orders';
import { authSaga } from '../modules/core';
import { categoryCreationModalSaga } from '../modules/modals/category';
import { categoriesSaga } from '../modules/categories';
import { dishesSaga } from '../modules/dishes';
import { dishModalSaga } from '../modules/modals/dish';
import { dishOrderModalSaga } from '../modules/modals/dish-order';
import { restauratorOrderModalSaga } from '../modules/modals/restaurator-order';
import { restaurantsSaga } from '../modules/restaurants';

export default function* rootSaga() {
  yield all([
    fork(checkoutSaga),
    fork(dndSaga),
    fork(ordersSaga),
    fork(authSaga),
    fork(categoriesSaga),
    fork(categoryCreationModalSaga),
    fork(dishModalSaga),
    fork(dishesSaga),
    fork(dishOrderModalSaga),
    fork(restauratorOrderModalSaga),
    fork(restaurantsSaga),
  ]);
}

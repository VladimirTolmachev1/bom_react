import { createSelector } from 'reselect';

import { allDishesByIdsSelector } from '../../dishes';

import { itemsByUuidsSelector } from '../../checkout/checkout.selectors';

export const activeIdFromDishOrderModalSelector = ({
  modals: { dishOrder },
}) => {
  return dishOrder.id;
};

export const isDishOrderModalLoadingSelector = ({ modals: { dishOrder } }) =>
  dishOrder.isLoading;

export const isDishOrderModalOpenSelector = ({ modals: { dishOrder } }) =>
  !!dishOrder.open;

export const isDishOrderCreationModalOpenSelector = ({
  modals: { dishOrder },
}) => {
  return dishOrder.open && !dishOrder.isEditing;
};

export const isDishOrderEditingModalOpenSelector = ({
  modals: { dishOrder },
}) => {
  return dishOrder.open && dishOrder.isEditing;
};

const emptyObject = {};
export const activeDishForDishOrderModalSelector = createSelector(
  [allDishesByIdsSelector, activeIdFromDishOrderModalSelector],
  (dishesById, id) => {
    return dishesById[id] || emptyObject;
  },
);

export const dishOrderInitialValuesSelector = createSelector(
  [activeDishForDishOrderModalSelector],
  dish => {
    const res = {
      ...dish,
      selectedSize: (dish.sizes || []).length ? dish.sizes[0].id : null,
    };

    return res;
  },
);

export const dishOrderEditingInitialValuesSelector = createSelector(
  [itemsByUuidsSelector, activeIdFromDishOrderModalSelector],
  (itemsByUuids, uuid) => itemsByUuids[uuid],
);

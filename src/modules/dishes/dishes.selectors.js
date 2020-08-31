import { createSelector } from 'reselect';

export const dishListCountSelector = ({ dishes }) => dishes.count;
export const dishListFiltersSelector = ({ dishes }) => dishes.filters;
export const dishListLoadingSelector = ({ dishes }) => dishes.loading;

export const allDishesByIdsSelector = ({ dishes }) => dishes.byId;
export const allDishIdsSelector = ({ dishes }) => dishes.allIds;

const emptyObject = {};
export const dishByIdFromPropsSelector = ({ dishes }, { dishId }) => {
  return dishes.byId[dishId] || emptyObject;
};

export const allDishesSelector = createSelector(
  [allDishesByIdsSelector, allDishIdsSelector],
  (byId, ids) => {
    return ids.map(id => {
      const dish = byId[id];

      if ((dish.sizes || []).length) {
        dish.price = dish.sizes[0].price;
      }

      return dish;
    });
  },
);

export const managedDishSelector = ({ dishes }) =>
  dishes.byId[dishes.mamaged] || {};

export const isSidngleDishLoadingSelector = ({ dishes }) =>
  dishes.isSidngleDishLoading;

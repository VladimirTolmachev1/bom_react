import { createSelector } from 'reselect';

export const categoriesListSelector = ({ categories }) => categories.data;

export const categoriesListLoading = ({ categories }) => categories.loading;

export const categoriesListFiltersSelector = ({ categories }) =>
  categories.filters;

export const managedCategorySelector = ({ categories }) =>
  categories.managedCategory;

export const categoryByIdFromPropsSelector = ({ categories }, { categoryId }) =>
  categories.data.find(({ id }) => id === categoryId) || {};

export const managedCategoryExtrasSelector = createSelector(
  managedCategorySelector,
  ({ extras, extra_lists }) => ({
    extras,
    extra_lists,
  }),
);

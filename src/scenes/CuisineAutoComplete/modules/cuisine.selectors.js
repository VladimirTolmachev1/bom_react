import { createSelector } from 'reselect';
import { resource } from './cuisine.modules';

export const _cuisineAutocompleteSliceSelector = state => state[resource];
export const cuisinesListSelector = createSelector(
  [_cuisineAutocompleteSliceSelector],
  slice => {
    return slice.data.map(({ name, value }) => ({ label: name, value }));
  },
);

export const cuisinesFiltersSelector = state =>
  _cuisineAutocompleteSliceSelector(state).filters;
export const cuisinesLoadingSelector = state =>
  _cuisineAutocompleteSliceSelector(state).loading;
export const cuisinesCountSelector = state =>
  _cuisineAutocompleteSliceSelector(state).count;

import { createSelector } from 'reselect';
import { resource } from './dish-autocomplete.modules';

export const _dishAutocompleteSliceSelector = state => state[resource];

export const dishesListSelector = createSelector(
  [_dishAutocompleteSliceSelector],
  slice => {
    return slice.data.map(({ name, id, extras, extra_lists, sizes }) => ({
      label: name,
      value: id,
      extra_lists,
      extras,
      sizes,
    }));
  },
);

export const dishesFiltersSelector = state =>
  _dishAutocompleteSliceSelector(state).filters;
export const dishesLoadingSelector = state =>
  _dishAutocompleteSliceSelector(state).loading;
export const dishesCountSelector = state =>
  _dishAutocompleteSliceSelector(state).count;

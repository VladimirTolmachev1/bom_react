import { createSelector } from 'reselect';
import { resource } from './zip-code-autocomplete.modules';

export const _zipcodeAutocompleteSliceSelector = state => state[resource];
export const zipcodesListSelector = createSelector(
  [_zipcodeAutocompleteSliceSelector],
  slice => {
    return slice.data.map(({ zipcode, city, state, country, id }) => ({
      label: `${zipcode} ${city} ${state} ${country}`,
      value: id,
      city,
      state,
      zipcode,
    }));
  },
);

export const zipcodesFiltersSelector = state =>
  _zipcodeAutocompleteSliceSelector(state).filters;
export const zipcodesLoadingSelector = state =>
  _zipcodeAutocompleteSliceSelector(state).loading;
export const zipcodesCountSelector = state =>
  _zipcodeAutocompleteSliceSelector(state).count;

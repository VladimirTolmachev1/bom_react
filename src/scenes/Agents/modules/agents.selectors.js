import { createSelector } from 'reselect';
import { resource } from './agents.modules';

export const _agentsSliceSelector = state => state[resource];
export const agentsListSelector = createSelector(
  [_agentsSliceSelector],
  slice => {
    return slice.data.map(({ name, value }) => ({ label: name, value }));
  },
);

export const agentsFiltersSelector = state =>
  _agentsSliceSelector(state).filters;
export const agentsLoadingSelector = state =>
  _agentsSliceSelector(state).loading;

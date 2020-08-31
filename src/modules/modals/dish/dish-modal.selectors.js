import { createSelector } from 'reselect';
import { allDishesByIdsSelector } from '../../dishes';

import {
  extrasFormValuesSelector,
  isSizesInvalidSelector,
  isExtrasInvalidSelector,
  isDishInfoInvalidSelector,
  isSizesPristineSelector,
  isExtrasPristineSelector,
  isDishInfoPristineSelector,
} from '../../../components/forms/selectors';

import { managedCategoryExtrasSelector } from '../../categories';

export const managedDishIdSelector = ({ modals }) => modals.dish.dishId;

export const managedDishSelector = createSelector(
  [managedDishIdSelector, allDishesByIdsSelector],
  (id, byIds) => byIds[id],
);

export const initialDishFormsValuesSelector = createSelector(
  [managedDishSelector],
  (dish = {}) => ({
    dishInfoForm: {
      name: dish.name,
      description: dish.description,
      picture: dish.picture,
      price: dish.price,
    },
    dishExtrasForm: {
      extras: dish.extras || [],
      extra_lists: dish.extra_lists || [],
    },
    dishSizesForm: {
      sizes: dish.sizes || [],
    },
  }),
);

export const dishModalOpenSelector = ({ modals }) => modals.dish.open;
export const dishModalActiveStepSelector = ({ modals }) =>
  modals.dish.activeStep;
export const dishModalIsEditingSelector = ({ modals }) => modals.dish.isEditing;

export const isDishEditingModalOpenSelector = state =>
  dishModalOpenSelector(state) && dishModalIsEditingSelector(state);
export const isDishCreationModalOpenSelector = state =>
  dishModalOpenSelector(state) && !dishModalIsEditingSelector(state);

export const substractArrByField = (
  target = [],
  toSubstract = [],
  field = 'id',
) =>
  target.filter(
    item1 => !toSubstract.some(item2 => item1[field] === item2[field]),
  );

export const extrasFromCategorySuggestionsSelector = createSelector(
  [managedCategoryExtrasSelector, extrasFormValuesSelector],
  ({ extras, extra_lists }, values) => ({
    extras: substractArrByField(extras, values.extras),
    extra_lists: substractArrByField(extra_lists, values.extra_lists),
  }),
);

export const isDishFormInvalidSelector = state =>
  isSizesInvalidSelector(state) ||
  isExtrasInvalidSelector(state) ||
  isDishInfoInvalidSelector(state);

export const isDishFormPristineSelector = state =>
  isSizesPristineSelector(state) &&
  isExtrasPristineSelector(state) &&
  isDishInfoPristineSelector(state);

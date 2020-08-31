import { createSelector } from 'reselect';

import { managedCategorySelector } from '../../categories';
import {
  isSizesInvalidSelector,
  isExtrasInvalidSelector,
  isCategoryInfoInvalidSelector,
  isSizesPristineSelector,
  isExtrasPristineSelector,
  isCategoryInfoPristineSelector,
} from '../../../components/forms/selectors';

export const managedCategoryIdSelector = ({ modals }) =>
  modals.category.categoryId;

export const initialCategoryFormsValuesSelector = createSelector(
  [managedCategorySelector],
  (category = {}) => ({
    categoryInfoForm: {
      name: category.name || '',
      description: category.description || '',
    },
    categoryExtrasForm: {
      extras: category.extras,
      extra_lists: category.extra_lists,
    },
  }),
);

export const categoryModalOpenSelector = ({ modals }) => modals.category.open;
export const categoryModalActiveStepSelector = ({ modals }) =>
  modals.category.activeStep;
export const categoryModalIsEditingSelector = ({ modals }) =>
  modals.category.isEditing;

export const isCategoryFormInvalidSelector = state =>
  isSizesInvalidSelector(state) ||
  isExtrasInvalidSelector(state) ||
  isCategoryInfoInvalidSelector(state);

export const isCategoryFormPristineSelector = state =>
  isSizesPristineSelector(state) &&
  isExtrasPristineSelector(state) &&
  isCategoryInfoPristineSelector(state);

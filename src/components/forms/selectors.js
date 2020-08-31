import {
  formValueSelector,
  isInvalid,
  isPristine,
  getFormSyncErrors,
} from 'redux-form';
import { dishOrderForEditindDecorator } from '../../modules/checkout/checkout.helpers';

import {
  SIZES_FORM,
  EXTRAS_FORM,
  CATEGORY_INFO_FORM,
  DISH_INFO_FORM,
  ORDER_ITEM_FORM,
  CLIENT_INFO_FORM,
} from './constants/form.names';

import {
  CATEGORY_INFO_FIELDS,
  EXTRAS_FIELDS,
  SIZES_FIELDS,
  DISH_INFO_FIELDS,
  ORDER_ITEM_FIELDS,
  CLIENT_INFO_FORM_FIELDS,
} from './constants/form.fields';

// CATEGORY INFO
export const categoryInfoFormFieldSelector = formValueSelector(
  CATEGORY_INFO_FORM,
);
export const categoryInfoFormValuesSelector = state =>
  categoryInfoFormFieldSelector(state, ...CATEGORY_INFO_FIELDS);
export const isCategoryInfoInvalidSelector = isInvalid(CATEGORY_INFO_FORM);
export const isCategoryInfoPristineSelector = isPristine(CATEGORY_INFO_FORM);

// DISH INFO
export const dishInfoFormFieldSelector = formValueSelector(DISH_INFO_FORM);
export const dishInfoFormValuesSelector = state =>
  dishInfoFormFieldSelector(state, ...DISH_INFO_FIELDS);
export const isDishInfoInvalidSelector = isInvalid(DISH_INFO_FORM);
export const isDishInfoPristineSelector = isPristine(DISH_INFO_FORM);

// SIZES
export const sizesFormFieldSelector = formValueSelector(SIZES_FORM);
export const sizesFormValuesSelector = state =>
  sizesFormFieldSelector(state, ...SIZES_FIELDS);
export const isSizesInvalidSelector = isInvalid(SIZES_FORM);
export const isSizesPristineSelector = isPristine(SIZES_FORM);

// EXTRAS
export const extrasFormFieldSelector = formValueSelector(EXTRAS_FORM);
export const extrasFormValuesSelector = state =>
  extrasFormFieldSelector(state, ...EXTRAS_FIELDS);
export const isExtrasInvalidSelector = isInvalid(EXTRAS_FORM);
export const isExtrasPristineSelector = isPristine(EXTRAS_FORM);

// ORDER ITEM
export const orderItemFormFieldsSelector = formValueSelector(ORDER_ITEM_FORM);
export const orderItemFormValuesSelector = state => {
  const values = orderItemFormFieldsSelector(state, ...ORDER_ITEM_FIELDS);

  return dishOrderForEditindDecorator(values);
};

// CLIENT INFO
export const clientInfoFormFieldsSelector = formValueSelector(CLIENT_INFO_FORM);
export const clientInfoFormValuesSelector = state =>
  clientInfoFormFieldsSelector(state, ...CLIENT_INFO_FORM_FIELDS);
export const isClientInfoFormInvalidSelector = isInvalid(CLIENT_INFO_FORM);
export const isClientInfoFormPristineSelector = isPristine(CLIENT_INFO_FORM);
export const clientInfoFormSyncErrorsSelector = getFormSyncErrors(
  CLIENT_INFO_FORM,
);

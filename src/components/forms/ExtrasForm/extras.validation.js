import { ValidationService } from '../../../services';

export const REQUIRED_EXTRAS_FIELDS = ['name', 'price'];

export const REQUIRED_EXTRAS_LIST_FIELDS = ['name', 'items'];

export const getExtraErrors = extra => {
  const errors = {};
  if (!extra) {
    return errors;
  }

  ValidationService.validateRequired(extra, REQUIRED_EXTRAS_FIELDS, errors);

  if (!ValidationService.number(extra.price)) {
    errors.price = 'Field must be numeric';
  }

  return errors;
};

export function validateExtras(prefix, extras, errors) {
  if (!extras) {
    return;
  }

  errors[prefix] = extras.map(getExtraErrors);
}

export function getExtraListErrors(list) {
  const errors = {};
  if (!list) {
    return errors;
  }

  ValidationService.validateRequired(list, REQUIRED_EXTRAS_LIST_FIELDS, errors);
  validateExtras('items', list.items, errors);

  return errors;
}

export function validateExtraLists(prefix, lists, errors) {
  if (!lists) {
    return;
  }

  errors[prefix] = lists.map(getExtraListErrors);
}

export default values => {
  const errors = {};
  validateExtras('extras', values.extras, errors);
  validateExtraLists('extra_lists', values.extra_lists, errors);

  return errors;
};

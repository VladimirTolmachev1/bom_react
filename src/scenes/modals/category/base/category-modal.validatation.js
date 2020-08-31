import { ValidationService } from '/services';

export const REQUIRED_EXTRAS_FIELDS = ['name', 'price'];

export const REQUIRED_EXTRAS_LIST_FIELDS = ['name', 'items'];

export const REQUIRED_CATEGORY_FIELDS = ['name '];

export const validateRequired = (values, fields, errors) => {
  fields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
};

export default values => {
  const errors = {};
  validateRequired(values, REQUIRED_CATEGORY_FIELDS, errors);
  validateExtras('extras', values.extras, errors);
  validateExtraLists('extra_lists', values.extra_lists, errors);

  return errors;
};

export function validateExtras(prefix, extras, errors) {
  if (!extras) {
    return;
  }

  errors[prefix] = [];

  extras.forEach((extra, index) => {
    errors[prefix][index] = getExtraErrors(extra);
  });
}

export function validateExtraLists(prefix, lists, errors) {
  if (!lists) {
    return;
  }

  errors[prefix] = [];

  lists.forEach((list, index) => {
    errors[prefix][index] = getExtraListErrors(list);
  });
}

export const getExtraErrors = extra => {
  const errors = {};
  if (!extra) {
    return errors;
  }

  validateRequired(extra, REQUIRED_EXTRAS_FIELDS, errors);

  if (!ValidationService.number(extra.price)) {
    errors.price = 'Field must be numeric';
  }

  return errors;
};

export function getExtraListErrors(list) {
  const errors = {};
  if (!list) {
    return errors;
  }

  validateRequired(list, REQUIRED_EXTRAS_LIST_FIELDS, errors);
  validateExtras('items', list.items, errors);

  return errors;
}

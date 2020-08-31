import { ValidationService } from '../../../services';

export const REQUIRED_SIZE_ITEM_FIELDS = ['name', 'price'];

export const getSizeItemErrors = size => {
  const errors = {};
  ValidationService.validateRequired(size, REQUIRED_SIZE_ITEM_FIELDS, errors);

  if (!ValidationService.number(size.price)) {
    errors.price = 'Field must be numeric';
  }

  return errors;
};

export default values => {
  const errors = {
    sizes: [],
  };

  if (!values.sizes) {
    return;
  }

  errors.sizes = values.sizes.map(getSizeItemErrors);

  return errors;
};

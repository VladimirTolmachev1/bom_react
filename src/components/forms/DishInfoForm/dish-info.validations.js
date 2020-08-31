import { ValidationService } from '../../../services';

export const REQUIRED_DISH_INFO_FIELDS = ['name'];

export default (values, props) => {
  const errors = {};
  ValidationService.validateRequired(values, REQUIRED_DISH_INFO_FIELDS, errors);

  if (!values.price && !(props.sizes || []).length) {
    errors.price = 'The price field is required when no sizes specified';
  }

  if (values.price && !ValidationService.number(values.price)) {
    errors.price = 'Field must be numeric';
  }

  return errors;
};

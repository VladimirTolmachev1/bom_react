import { ValidationService } from '../../../services';

export const REQUIRED_CATEGORY_INFO_FIELDS = ['name'];

export default values => {
  const errors = {};
  ValidationService.validateRequired(
    values,
    REQUIRED_CATEGORY_INFO_FIELDS,
    errors,
  );

  return errors;
};

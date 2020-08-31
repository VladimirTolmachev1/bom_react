import { ValidationService } from '../../../services';

export const resetPasswordValidation = values => {
  const errors = {};

  const requiredFields = ['email', 'password', 'password_confirmation'];

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  if (!ValidationService.email(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (values.password !== values.password_confirmation) {
    errors.password_confirmation = 'Password does not match with previous';
  }

  return errors;
};

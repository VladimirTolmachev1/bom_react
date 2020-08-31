import { ValidationService } from '../../../services';

export const forgotPasswordValidation = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!ValidationService.email(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

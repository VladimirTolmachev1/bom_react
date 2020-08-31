import { ValidationService } from '../../../services';

export const signInValidation = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  }

  if (!ValidationService.email(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  }

  return errors;
};

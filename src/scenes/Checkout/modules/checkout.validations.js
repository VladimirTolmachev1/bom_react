import { ValidationService } from '../../../services/ValidationService/ValidationService';
import { DELIVERY_METHOD } from '../../../constants';

export const requiredFields = ['name', 'phone', 'payment_method', 'email'];
export const additionalRequiredFields = [
  'city',
  'street_address',
  'building',
  'appartment',
];

export const checkoutValidations = values => {
  const errors = {};

  requiredFields.forEach(key => {
    if (!values[key]) {
      errors[key] = 'Required';
    }
  });

  if (
    ValidationService.exist(values.phone) &&
    !ValidationService.validatePhone(values.phone)
  ) {
    errors.phone = 'Invalid phone';
  }

  if (
    ValidationService.exist(values.email) &&
    !ValidationService.email(values.email)
  ) {
    errors.email = 'Invalid email address';
  }

  if (values.delivery_method && values.delivery_method === DELIVERY_METHOD) {
    additionalRequiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Required';
      }
    });
  }

  return errors;
};

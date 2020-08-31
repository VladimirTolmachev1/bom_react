import { ValidationService } from '../../../services';

export const restaurantModalValidation = values => {
  const errors = {};
  const requiredFields = [
    'agent_name',
    'restaurant_name',
    'manager_name',
    'manager_email',
    'cuisine_type',
    'subscription',
    'street_address',
    'city',
    'state',
    'zipcode',
    'delivery_method',
  ];

  const phonesFields = ['phone_number', 'phone_number2'];

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  if (!ValidationService.email(values.manager_email)) {
    errors.manager_email = 'Invalid email address';
  }

  if (
    values.delivery_email &&
    !ValidationService.email(values.delivery_email)
  ) {
    errors.delivery_email = 'Invalid email address';
  }

  phonesFields.forEach(name => {
    if (
      ValidationService.exist(values[name]) &&
      !ValidationService.validatePhone(values[name])
    ) {
      errors[name] = 'Invalid phone';
    }
  });

  return errors;
};

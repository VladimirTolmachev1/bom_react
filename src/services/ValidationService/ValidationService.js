export class ValidationService {
  static validationTypes = [
    'maxLength',
    'notNullOrEmpty',
    'phone',
    'postalCode',
    'email',
  ];

  static validateRequired = (values, fields, errors) => {
    fields.forEach(field => {
      if (!values[field]) {
        // eslint-disable-next-line no-param-reassign
        errors[field] = 'Required';
      }
    });
  };

  static exist(value) {
    return ![undefined, null].includes(value);
  }

  static validatePhone(value) {
    const phoneRegExpr = /\(\d{3}\)\s\d{3}-\d{4}/;

    return phoneRegExpr.test(value);
  }

  static number(value) {
    const numericRegExpr = /^[+-]?\d*\.?\d+(?:[Ee][+-]?\d+)?$/;

    return numericRegExpr.test(value);
  }

  static email(str) {
    const emailRegExpr = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    return emailRegExpr.test(str);
  }

  /**
   * Accepts value and returns string "Required" if value is empty. Otherwise
   * returns false.
   * @param {any} value value to validate
   */
  static required(value) {
    return value ? false : 'Required';
  }
}

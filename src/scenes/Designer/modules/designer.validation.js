export const designerValidation = values => {
  const errors = {};

  const requiredFields = [
    'url',
    'menu_page_name',
    'logo',
    'background_picture',
  ];

  for (const field of requiredFields) {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  }

  return errors;
};

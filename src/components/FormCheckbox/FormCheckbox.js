import React from 'react';
import PropTypes from 'prop-types';
import { AppCheckbox } from '../AppCheckbox';

const FormCheckbox = ({
  input,
  className,
  label,
  required,
  meta: { touched, error },
}) => {
  return (
    <AppCheckbox
      value={Boolean(input.value)}
      // className={ `app-form-control` }
      className={className}
      {...{
        label,
        required,
      }}
      error={Boolean(touched && error)}
      {...input}
    />
  );
};

FormCheckbox.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.bool,
};

export default FormCheckbox;

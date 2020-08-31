import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';

import './AppFormTextField.scss';

export const AppFormTextField = ({
  input,
  className,
  disabled,
  type,
  label,
  rows,
  autofilled,
  required,
  multiline,
  meta: { touched, error },
  ...rest
}) => {
  return (
    <div className={`app-form-control__container ${className}`}>
      <TextField
        value={input.value}
        className="app-form-control"
        {...{
          type,
          multiline,
          autofilled,
          disabled,
          label,
          required,
          rows,
        }}
        error={Boolean(touched && error)}
        {...input}
        {...rest}
      />
      {touched && error ? (
        <FormHelperText className="app-form-control__error">
          {error}
        </FormHelperText>
      ) : (
        false
      )}
    </div>
  );
};

AppFormTextField.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

AppFormTextField.defaultProps = {
  className: '',
};

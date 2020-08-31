import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

export const FormTextField = ({
  input,
  meta: { touched, error },
  forceTouched,
  ...rest
}) => {
  const hasError = Boolean((forceTouched || touched) && error);

  return (
    <TextField
      value={input.value}
      error={hasError}
      margin="dense"
      variant="outlined"
      inputProps={{
        autoComplete: 'off',
      }}
      helperText={hasError && error}
      {...input}
      {...rest}
    />
  );
};

FormTextField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

export default FormTextField;

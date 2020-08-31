import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';

import { TextField } from '@material-ui/core';

const TextMaskCustom = props => {
  const { inputRef, ...other } = props;

  return <MaskedInput {...other} ref={inputRef} />;
};

const FormMaskTextField = ({
  input,
  onChangeInterseptor,
  mask,
  meta: { touched, error },
  ...rest
}) => {
  const hasError = Boolean(touched && error);

  return (
    <TextField
      margin="dense"
      variant="outlined"
      InputProps={{
        inputComponent: TextMaskCustom,
        inputProps: {
          mask,
        },
      }}
      {...input}
      onChange={(...args) => {
        const { value } = args[0].target;
        input.onChange(...args);
        onChangeInterseptor && onChangeInterseptor(value);
      }}
      value={input.value}
      {...rest}
      error={hasError}
      helperText={hasError && error}
    />
  );
};

FormMaskTextField.propTypes = {
  mask: PropTypes.array.isRequired,
  onChangeInterseptor: PropTypes.func,
  input: PropTypes.object.isRequired,
};

export default FormMaskTextField;

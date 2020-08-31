import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormHelperText } from '@material-ui/core';
import { AppSelect } from '..';

export const FormSelect = ({
  input,
  withoutNone,
  fullWidth,
  label,
  required,
  outlined,
  options,
  meta: { touched, error },
}) => {
  return (
    <FormControl required={required} fullWidth={fullWidth}>
      <AppSelect
        value={input.value}
        className="app-form-control"
        outlined={outlined}
        {...{
          label,
          options,
          required,
          withoutNone,
        }}
        error={Boolean(touched && error)}
        {...input}
        onChange={data => input.onChange(data[input.name])}
      />
      {touched && error ? (
        <FormHelperText className="app-form-control__error">
          {error}
        </FormHelperText>
      ) : (
        false
      )}
    </FormControl>
  );
};

FormSelect.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.string,
  }),
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,

  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ),
  withoutNone: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

AppSelect.defaultProps = {
  options: [],
};

/* eslint-disable eqeqeq */
import React from 'react';
import { FormControlLabel, Radio, Grid } from '@material-ui/core';

const FormRadio = ({
  input: { onBlur, ...inputRest },
  name,
  label,
  radioValue,
  ...rest
}) => {
  return (
    <Grid
      item
      onClick={event => {
        if (inputRest.value == radioValue) {
          inputRest.onChange(null);
          event.preventDefault();
        }
      }}>
      <FormControlLabel
        control={<Radio color="primary" />}
        label={label}
        labelPlacement="end"
        {...rest}
        {...inputRest}
        onBlur={() => onBlur()}
        name={name}
        value={radioValue}
        checked={inputRest.value == radioValue}
      />
    </Grid>
  );
};

export default FormRadio;

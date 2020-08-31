import React from 'react';
import PropTypes from 'prop-types';
// import FormHelperText from '@material-ui/core/FormHelperText';
import { AppCheckbox } from '../AppCheckbox';

export const AppFormCheckbox = ({
  input,
  label,
  required,
  meta: { touched, error },
}) => {
  return (
    <AppCheckbox
      value={Boolean(input.value)}
      className="app-form-control"
      {...{
        label,
        required,
      }}
      error={Boolean(touched && error)}
      {...input}
    />
    // { Boolean(touched && error)
    //     ? <FormHelperText className="app-form-control__error">{ error }</FormHelperText>
    //     : false
    // }
  );
};

AppFormCheckbox.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.bool,
};

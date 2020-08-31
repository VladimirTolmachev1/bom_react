import React from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';
import PropTypes from 'prop-types';
import { AppColorPicker } from '../AppColorPicker';

export const AppFormColorPicker = ({
  input,
  className,
  label,
  required,
  meta: { touched, error },
}) => {
  return (
    <div className={`app-form-control ${className}`}>
      <AppColorPicker
        {...{
          label,
          required,
        }}
        {...input}
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

AppFormColorPicker.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.bool,
};

AppFormColorPicker.defaultProps = {};

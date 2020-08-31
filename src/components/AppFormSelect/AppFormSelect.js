import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, FormHelperText } from '@material-ui/core';

import styles from './styles';
import { AppSelect } from '../AppSelect';

export const AppFormSelect = withStyles(styles)(
  ({
    input,
    classes,
    className,
    wrapperClassName,
    withoutNone,
    type,
    label,
    required,
    options,
    meta: { touched, error },
  }) => {
    return (
      <div className={`${classes.formControlContainer} ${wrapperClassName}`}>
        <AppSelect
          value={input.value}
          className={`${classes.formControl} ${className}`}
          {...{
            type,
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
      </div>
    );
  },
);

AppFormSelect.propTypes = {
  options: PropTypes.array,
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

import styles from './styles';
import { GridReduxFormField } from '../GridReduxFormField';
import { FormTextField } from '../FormTextField';

const SmallGridReduxFormInput = ({
  name,
  label,
  gridClassName,
  required,
  classes,
  ...rest
}) => (
  <GridReduxFormField
    name={name}
    label={label}
    required={required}
    margin="none"
    withoutCaption
    gridProps={{
      className: gridClassName,
      alignItems: 'flex-start',
    }}
    InputLabelProps={{
      classes: {
        outlined: classes.cssLabel,
      },
    }}
    inputProps={{
      autoComplete: 'off',
      className: classes.input,
    }}
    component={FormTextField}
    className={classes.marginDense}
    fullWidth
    {...rest}
  />
);

SmallGridReduxFormInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  gridClassName: PropTypes.string,
  required: PropTypes.bool,
  classes: PropTypes.object,
};

SmallGridReduxFormInput.defaultProps = {
  gridClassName: '',
  required: false,
};

export default withStyles(styles)(SmallGridReduxFormInput);

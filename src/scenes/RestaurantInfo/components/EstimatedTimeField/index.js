import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Grid, FormLabel, Typography, withStyles } from '@material-ui/core';

import styles from './styles';
import { FormTextField } from '../../../../components/FormTextField';

const EstimatedTimeField = ({ label, name, classes, ...rest }) => (
  <Grid item container wrap="nowrap" alignItems="center" alignContent="center">
    <FormLabel className={classes.timeLabel}> {label} </FormLabel>
    <Field
      name={name}
      component={FormTextField}
      className={classes.estimatedTimeInputWrapper}
      {...rest}
      type="number"
    />
    <Typography> mins </Typography>
  </Grid>
);

EstimatedTimeField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EstimatedTimeField);

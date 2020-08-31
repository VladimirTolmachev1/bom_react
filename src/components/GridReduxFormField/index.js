import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Grid, FormLabel, withStyles } from '@material-ui/core';

import styles from './styles';

export const GridReduxFormField = ({
  caption,
  gridProps,
  component,
  name,
  classes,
  captionClassName,
  withoutCaption,
  type,
  ...rest
}) => (
  <Grid
    item
    container
    justify="space-between"
    alignItems="center"
    {...gridProps}>
    {!withoutCaption && (
      <FormLabel className={`${classes.caption} ${captionClassName}`}>
        {caption}
      </FormLabel>
    )}
    <Field
      name={name}
      normalize={type === 'number' ? val => +val : undefined}
      component={component}
      type={type}
      {...rest}
    />
  </Grid>
);

GridReduxFormField.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.node,
  ]).isRequired,

  classes: PropTypes.object.isRequired,
  captionClassName: PropTypes.string,
  name: PropTypes.string.isRequired,
  withoutCaption: PropTypes.bool,
  caption: PropTypes.node,
};

GridReduxFormField.defaultProps = {
  gridProps: {},
  withoutCaption: false,
  captionClassName: '',
  caption: '',
};

export default withStyles(styles)(GridReduxFormField);

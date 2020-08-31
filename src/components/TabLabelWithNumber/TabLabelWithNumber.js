import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, withStyles } from '@material-ui/core';
import styles from './styles';

const TabLabelWithNumber = ({
  text,
  number,
  classes,
  gridProps,
  textLabelProps,
  numberLabelProps,
}) => (
  <Grid
    container
    alignItems="center"
    wrap="nowrap"
    justify="center"
    {...gridProps}>
    <Typography component="span" {...textLabelProps}>
      {text}
    </Typography>

    {number > 0 && (
      <Typography
        variant="caption"
        className={classes.numberCaption}
        {...numberLabelProps}>
        {` (${number})`}
      </Typography>
    )}
  </Grid>
);

TabLabelWithNumber.propTypes = {
  text: PropTypes.string.isRequired,
  number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  classes: PropTypes.object.isRequired,
  gridProps: PropTypes.object,
  textLabelProps: PropTypes.object,
  numberLabelProps: PropTypes.object,
};

TabLabelWithNumber.defaultProps = {
  gridProps: {},
  textLabelProps: {},
  numberLabelProps: {},
};

export default withStyles(styles)(TabLabelWithNumber);

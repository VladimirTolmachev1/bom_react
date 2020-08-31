import React from 'react';
import PropTypes from 'prop-types';
import { Grid, FormLabel, Typography, Switch } from '@material-ui/core';

const AppSwitch = ({
  label,
  gridProps,
  onCaption,
  offCaption,
  captionProps,
  ...switchProps
}) => (
  <>
    {label && <FormLabel> {label} </FormLabel>}
    <Grid container wrap="nowrap" alignItems="center" {...gridProps}>
      {offCaption && <Typography {...captionProps}> {offCaption} </Typography>}
      <Switch {...switchProps} />
      {onCaption && <Typography {...captionProps}> {onCaption} </Typography>}
    </Grid>
  </>
);

AppSwitch.defaultProps = {
  captionProps: {},
  gridProps: {},
};

AppSwitch.propTypes = {
  label: PropTypes.string,
  gridProps: PropTypes.object,
  onCaption: PropTypes.string,
  offCaption: PropTypes.string,
  captionProps: PropTypes.object,
};

export default AppSwitch;

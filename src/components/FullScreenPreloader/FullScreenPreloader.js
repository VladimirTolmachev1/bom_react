import React from 'react';
import { Grid, withStyles } from '@material-ui/core';
import { AppPreloaderSmall } from '..';

import styles from './styles';

const FullScreenPreloader = ({ classes, children }) => (
  <Grid
    container
    justify="center"
    alignItems="center"
    className={classes.preloader}>
    <AppPreloaderSmall>{children}</AppPreloaderSmall>
  </Grid>
);

export default withStyles(styles)(FullScreenPreloader);

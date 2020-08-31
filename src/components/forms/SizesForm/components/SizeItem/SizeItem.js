import React from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import { Grid, withStyles, IconButton } from '@material-ui/core';

import styles from './styles';
import { SmallGridReduxFormInput } from '../../../../SmallGridReduxFormInput';

const SizeItem = ({ onRemoveClick, classes, field }) => (
  <Grid container direction="row" spacing={8}>
    <SmallGridReduxFormInput
      required
      name={`${field}.name`}
      label="Name"
      gridClassName={classes.primaryInput}
    />

    <SmallGridReduxFormInput
      required
      type="numeric"
      name={`${field}.price`}
      label="Price"
      gridClassName={classes.secondaryInput}
    />

    <Grid
      item
      container
      className={classes.deleteIconWrapper}
      justify="flex-end"
      alignItems="center">
      <IconButton onClick={onRemoveClick}>
        <ClearIcon />
      </IconButton>
    </Grid>
  </Grid>
);

export default withStyles(styles)(SizeItem);

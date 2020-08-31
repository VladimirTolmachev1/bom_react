import React from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import { Grid, withStyles, IconButton } from '@material-ui/core';

import styles from './styles';
import { SmallGridReduxFormInput } from '../../../../SmallGridReduxFormInput';

import { SizesRestrictionsSelect } from '../SizesRestrictionsSelect';

const ExtraItem = ({
  onRemoveClick,
  classes,
  field,
  sizesOptions,
  canSetTargetSize,
}) => (
  <Grid
    container
    direction="row"
    spacing={16}
    alignItems="flex-start"
    wrap="nowrap">
    <SmallGridReduxFormInput
      required
      name={`${field}.name`}
      label="Name"
      gridClassName={classes.nameInput}
    />

    <SmallGridReduxFormInput
      required
      type="number"
      name={`${field}.price`}
      label="Price"
      gridClassName={classes.priceInput}
    />

    {canSetTargetSize && (
      <SizesRestrictionsSelect
        name={`${field}.sizes`}
        options={sizesOptions}
        wrapperClassName={classes.sizesRestrictionsSelect}
      />
    )}

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

ExtraItem.defaultProps = {
  sizesOptions: [],
};

export default withStyles(styles)(ExtraItem);

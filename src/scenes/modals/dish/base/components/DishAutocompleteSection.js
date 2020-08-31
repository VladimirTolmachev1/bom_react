import React from 'react';
import { Grid, withStyles, Typography } from '@material-ui/core';

import { DishAutocomplete } from '../../../../DishAutocomplete';

const styles = () => ({
  autocompleteWrapper: {
    width: '100%',
  },
});

const DishAutocompleteSection = ({
  classes,
  caption,
  onChange,
  value,
  optionFilter,
  valuesToExclude,
  ...restAutocompleteProps
}) => (
  <Grid container item direction="column">
    <Typography> {caption} </Typography>

    <DishAutocomplete
      valuesToExclude={valuesToExclude}
      optionFilter={optionFilter}
      exludeOptionsAfterSelection
      wrapperClassName={classes.autocompleteWrapper}
      onChange={onChange}
      value={value}
      {...restAutocompleteProps}
    />
  </Grid>
);

export default withStyles(styles)(DishAutocompleteSection);

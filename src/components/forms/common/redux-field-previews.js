import React from 'react';
import { Grid, Typography } from '@material-ui/core';

export const ReduxFieldPreview = ({
  label,
  input,
  transformValue,
  typographyProps,
}) => (
  <Grid item>
    {label && (
      <Typography color="textSecondary" {...typographyProps}>
        {' '}
        {label}{' '}
      </Typography>
    )}
    <Typography {...typographyProps}>
      {transformValue ? transformValue(input.value) : input.value}
    </Typography>
  </Grid>
);

export const ReduxCheckboxFieldPreview = ({
  input,
  checkedText,
  uncheckedText,
  typographyProps,
}) => (
  <Grid item>
    <Typography color="textSecondary" {...typographyProps}>
      {input.value ? checkedText : uncheckedText}
    </Typography>
  </Grid>
);

import React from 'react';
import { Grid, withStyles, Typography } from '@material-ui/core';
import { FieldArray } from 'redux-form';

import styles from './styles';
import { ClientSingleselectionExtras } from '../ClientSingleselectionExtras';
import { ClientMultiselectionExtras } from '../ClientMultiselectionExtras';

const ClientExtrasLists = ({ fields, classes, change, selectedSizeId }) => (
  <Grid item container direction="column">
    {fields.map((field, index) => {
      const list = fields.get(index);

      return (
        <Grid
          item
          contaier
          direction="column"
          key={field}
          className={classes.extraListItem}>
          <Typography variant="subtitle1">
            {list.name}{' '}
            {list.multi_selection ? '(select multiple)' : '(select one)'}
          </Typography>

          <FieldArray
            name={`${field}.items`}
            component={
              list.multi_selection
                ? ClientMultiselectionExtras
                : ClientSingleselectionExtras
            }
            parentField={field}
            change={change}
            selectedSizeId={selectedSizeId}
          />
        </Grid>
      );
    })}
  </Grid>
);

export default withStyles(styles)(ClientExtrasLists);

import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Field } from 'redux-form';

import { SingleExtraRadioOption } from '../SingleExtraRadioOption';
import { isNotSatisfiesSizesLimits } from '../../../../../modules/dishes';
import { CurrencyService } from '../../../../../services';

const ClientSingleselectionExtras = ({
  fields,
  parentField,
  change,
  selectedSizeId,
}) => (
  <Grid container item spacing={8}>
    {fields.map((field, index) => {
      const extra = fields.get(index);

      if (isNotSatisfiesSizesLimits(extra, selectedSizeId)) {
        extra.selected && change(`${field}.selected`, false);
        return null;
      }

      return (
        <Grid item>
          <Field
            name={`${field}.id`}
            component={SingleExtraRadioOption}
            radioFieldName={`${parentField}.selectedExtra`}
            label={
              <Grid container spacing={8}>
                <Grid item>
                  <Typography>{extra.name}</Typography>
                </Grid>

                <Grid item>
                  <Typography>$ {CurrencyService.show(extra.price)}</Typography>
                </Grid>
              </Grid>
            }
          />
        </Grid>
      );
    })}
  </Grid>
);

export default ClientSingleselectionExtras;

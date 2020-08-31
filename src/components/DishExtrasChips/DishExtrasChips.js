import React from 'react';
import { Grid, Typography, Chip } from '@material-ui/core';
import { CurrencyService } from '../../services';

const DishExtrasChips = ({ extras, title }) => (
  <Grid container direction="column">
    <Typography variant="subheading" paragraph>
      {title}
    </Typography>

    <Grid container item spacing={16}>
      {extras.map(({ name, price, amount, id }) => (
        <Grid item key={id}>
          <Chip
            variant="outlined"
            label={
              <Grid container spacing={16}>
                <Grid item>
                  <Typography color="secondary">
                    ${CurrencyService.show(price)}
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography>
                    {' '}
                    {name} ({amount})
                  </Typography>
                </Grid>
              </Grid>
            }
          />
        </Grid>
      ))}
    </Grid>
  </Grid>
);

DishExtrasChips.defaultProps = {
  extras: [],
  title: 'Extras: ',
};

export default DishExtrasChips;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { AppFormSelect } from '../AppFormSelect';
import { CurrencyService } from '../../services';

export class DishSizesSelect extends Component {
  onChange = option => {
    const { onChange } = this.props;
    onChange && onChange(option);
  };

  mapOptions() {
    const { options } = this.props;

    return options.map(({ id, name, price }) => ({
      value: id,
      renderName: () => (
        <Grid container justify="space-between">
          <Typography> {name} </Typography>
          <Typography color="textSecondary">
            $ {CurrencyService.show(price)}
          </Typography>
        </Grid>
      ),
    }));
  }

  render() {
    const { value, name, options, SelectComponent, ...rest } = this.props;

    if (!options.length) {
      return null;
    }

    return (
      <SelectComponent
        name={name}
        withoutNone
        value={value}
        label="Select size"
        {...rest}
        options={this.mapOptions()}
        onChange={this.onChange}
      />
    );
  }
}

DishSizesSelect.propTypes = {
  value: PropTypes.any,
  options: PropTypes.array,
};

DishSizesSelect.defaultProps = {
  options: [],
  name: 'selectedSize',
  SelectComponent: AppFormSelect,
};

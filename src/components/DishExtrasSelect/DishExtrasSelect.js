import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { AppSelect } from '../AppSelect';
import { CurrencyService } from '../../services';

export class DishExtrasSelect extends Component {
  onChange = option => {
    const { onChange } = this.props;
    onChange && onChange(option);
  };

  mapOptions() {
    const { options, excludedIds } = this.props;

    return options
      .filter(option => !excludedIds.find(id => id === option.id))
      .map(({ id, name, price }) => ({
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
    const { label, disabledlabel, ...appSelectProps } = this.props;

    const options = this.mapOptions();
    const isDisabled = !options.length;

    const finalLabel = isDisabled ? disabledlabel : label;

    return (
      <AppSelect
        name="extraId"
        value=""
        withoutNone
        label={finalLabel}
        disabled={isDisabled}
        {...appSelectProps || {}}
        options={options}
        onChange={this.onChange}
      />
    );
  }
}

DishExtrasSelect.propTypes = {
  label: PropTypes.node,
  disabledlabel: PropTypes.node,
  excludedIds: PropTypes.array,
  options: PropTypes.array,
};

DishExtrasSelect.defaultProps = {
  options: [],
  excludedIds: [],
  label: 'Select extras',
  disabledlabel: 'All extras is selected',
};

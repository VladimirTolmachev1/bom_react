import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, withStyles } from '@material-ui/core';

import { CurrencyService } from '../../services';
import { EditActions } from '../EditActions';

import styles from './styles';

const DishExtras = ({
  extras,
  noExtras,
  canEdit,
  showPrice,
  classes,
  onAddClick,
  onRemoveClick,
  onSubstructClick,
  wrapperGridProps,
  extraItemGridProps,
  wrapperClassName,
}) => {
  if (!extras.length) {
    return noExtras;
  }

  return (
    <Grid container item className={wrapperClassName} {...wrapperGridProps}>
      {extras.map(extra => {
        const { name, id, amount, price } = extra;
        const isSubstructDisabled = amount <= 1;

        return (
          <Grid
            item
            container
            justify="space-between"
            key={id || name}
            {...extraItemGridProps}>
            <Grid
              container
              alignItems="center"
              item
              justify={canEdit ? 'flex-start' : 'space-between'}
              className={canEdit ? classes.actionsWrapper : ''}>
              <Typography className={classes.extraName}>
                - Add {name}
              </Typography>
              <Typography color="textSecondary">X {amount}</Typography>

              {showPrice && (
                <Typography color="textSecondary" className={classes.price}>
                  ${CurrencyService.show(amount * price)}
                </Typography>
              )}
            </Grid>
            {canEdit && (
              <EditActions
                onAddClick={onAddClick}
                onSubstructClick={onSubstructClick}
                onRemoveClick={onRemoveClick}
                target={extra}
                substractBtnProps={{
                  disabled: isSubstructDisabled,
                }}
              />
            )}
          </Grid>
        );
      })}
    </Grid>
  );
};

DishExtras.propTypes = {
  extras: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ),
  canEdit: PropTypes.bool,
  noExtras: PropTypes.node,
  showPrice: PropTypes.bool,
  onAddClick: PropTypes.func,
  onRemoveClick: PropTypes.func,
  onSubstructClick: PropTypes.func,
  wrapperGridProps: PropTypes.object,
  extraItemGridProps: PropTypes.object,
  wrapperClassName: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

DishExtras.defaultProps = {
  wrapperClassName: '',
  noExtras: null,
  canEdit: false,
  showPrice: false,
  wrapperGridProps: {},
  extraItemGridProps: {},
  extras: [],
  onAddClick: null,
  onRemoveClick: null,
  onSubstructClick: null,
};

export default withStyles(styles)(DishExtras);

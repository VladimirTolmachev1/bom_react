import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Grid, withStyles, Typography, Hidden } from '@material-ui/core';

import styles from './styles';
import { CurrencyService } from '../../services';

import { EditActions } from '../EditActions';

const DishTitle = ({
  name,
  price,
  amount,
  canEdit,
  classes,
  sizeName,
  extraPart,
  onAddClick,
  onRemoveClick,
  onSubstructClick,
  typographyVariant,
  typographyClass,
  withoutDelete,
}) => (
  <Grid
    item
    container
    justify="space-between"
    className={classes.mainWrapper}
    alignItems="flex-start"
    wrap="nowrap">
    <Grid container item className={classes.mainSection}>
      <Grid item container className={classes.widthAuto} direction="column">
        <Typography
          className={classNames(classes.dishDialogTitle, typographyClass)}
          variant={typographyVariant}>
          {sizeName && `${sizeName} `}
          {name} {amount && <span className={classes.amount}>({amount})</span>}
        </Typography>

        <Hidden smUp>
          <Typography
            className={classNames(classes.dishDialogTitle, typographyClass)}
            variant={typographyVariant}>
            ${CurrencyService.show(price)}
          </Typography>
        </Hidden>
      </Grid>

      {canEdit && (
        <EditActions
          withoutDelete={withoutDelete}
          onAddClick={onAddClick}
          onSubstructClick={onSubstructClick}
          onRemoveClick={onRemoveClick}
          substractBtnProps={{
            disabled: amount <= 1,
          }}
        />
      )}
    </Grid>

    <Grid
      item
      container
      alignItems="center"
      justify="flex-end"
      className={classes.widthAuto}
      wrap="nowrap">
      <Hidden xsDown>
        <Typography
          className={classNames(classes.dishDialogTitle, typographyClass)}
          variant={typographyVariant}>
          ${CurrencyService.show(price)}
        </Typography>
      </Hidden>

      {extraPart && extraPart}
    </Grid>
  </Grid>
);

DishTitle.propTypes = {
  name: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  typographyVariant: PropTypes.string,
  sizeName: PropTypes.string,
  canEdit: PropTypes.bool,
  onAddClick: PropTypes.func,
  onSubstructClick: PropTypes.func,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

DishTitle.defaultProps = {
  typographyVariant: 'headline',
  canEdit: false,
};

export default withStyles(styles)(DishTitle);

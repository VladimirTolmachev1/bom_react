import React from 'react';
import PropTypes from 'prop-types';
import { Grid, withStyles } from '@material-ui/core';

import styles from './styles';
import { DishExtras } from '../../../../components';
import { orderProductShape } from '../../../../constants/propTypes';

const OrderProductItem = ({
  product: { selectedSize, name, selectedExtras, amount },
  classes,
}) => (
  <>
    <Grid
      container
      alignItems="center"
      justify="space-between"
      className={classes.productHeader}>
      <span className={classes.productHeaderText}>
        {(selectedSize || {}).name && `${selectedSize.name} `}
        {name}
      </span>

      <span className={classes.productHeaderText}>X {amount || 1}</span>
    </Grid>

    <DishExtras
      extras={selectedExtras}
      wrapperClassName={classes.productExtras}
    />
  </>
);

OrderProductItem.propTypes = {
  product: PropTypes.shape(orderProductShape).isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrderProductItem);

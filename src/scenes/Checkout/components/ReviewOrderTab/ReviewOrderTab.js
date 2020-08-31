import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';

import styles from './styles';
import { Link } from '../../../../components';
import { HelperService } from '../../../../services';
import { ReviewOrderItem } from '../ReviewOrderItem';
import { DishOrderTotal } from '../../../Menu/components';
import { DishOrderEditingModal } from '../../../modals/dish-order';

export default
@withStyles(styles)
class ReviewOrderTab extends PureComponent {
  makeDishExtraControlClickHandler = (dish, handlerToApply) => extra =>
    handlerToApply(extra, dish);

  mapOrderItems() {
    const {
      order,

      handleRemoveOrderItemClick,
      handleEditOrderItemClick,

      removeDishFromOrder,
    } = this.props;

    return order.map(item => (
      <Grid item key={item.uuid}>
        <ReviewOrderItem
          item={item}
          removeDishFromOrder={removeDishFromOrder}
          handleRemoveOrderItemClick={handleRemoveOrderItemClick}
          handleEditOrderItemClick={handleEditOrderItemClick}
        />
      </Grid>
    ));
  }

  render() {
    const {
      restaurant_url,
      handleNextStep,
      totalPrice,
      canNextStep,
      classes,
    } = this.props;

    return (
      <Grid container justify="flex-end">
        <DishOrderEditingModal />

        <Grid
          container
          item
          direction="column"
          spacing={16}
          wrap="nowrap"
          className={classes.orderItemsWrapper}>
          {this.mapOrderItems()}
        </Grid>

        <Grid item className={classes.orderTotalPriceSection}>
          <DishOrderTotal
            showCheckoutBtn={false}
            {...HelperService.pick(totalPrice, [
              'subtotal',
              'deliveryFee',
              'salesTax',
              'total',
            ])}
          />
        </Grid>

        <Grid container item justify="space-between">
          <Link to={`/r/${restaurant_url}`}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.checkoutControlBtn}>
              Back to Menu
            </Button>
          </Link>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextStep}
            disabled={!canNextStep}
            className={classes.checkoutControlBtn}>
            Process Payment
          </Button>
        </Grid>
      </Grid>
    );
  }
}

ReviewOrderTab.propTypes = {
  handleNextStep: PropTypes.func,
  removeDish: PropTypes.func,
  setDishExtra: PropTypes.func,
  removeDishExtra: PropTypes.func,
  setDishSize: PropTypes.func,
  restaurantLink: PropTypes.string,
  order: PropTypes.array,
  totalPrice: PropTypes.object,
  canNextStep: PropTypes.bool,
  removeDishFromOrder: PropTypes.func,
};

ReviewOrderTab.defaultProps = {
  canNextStep: false,
};

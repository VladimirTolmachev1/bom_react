import React, { PureComponent } from 'react';
import Drawer from '@material-ui/core/Drawer';
import PropTypes from 'prop-types';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { connect } from 'react-redux';
import { IconButton, Badge, withStyles } from '@material-ui/core';

import Hidden from '@material-ui/core/Hidden';
import styles from './styles';
import { matchParamsSelector } from '../../../../selectors/common';
import {
  totalPriceSelector,
  checkoutItemsSelector,
  removeItemFromCheckout,
} from '../../../../modules/checkout';

import { DishOrder } from '../../../Menu/components';

const mapStateToProps = state => ({
  order: checkoutItemsSelector(state),
  checkoutOrderTotal: totalPriceSelector(state),
  // TODO: move all routes to constants form app
  matchParams: matchParamsSelector(state, '/r/:restaurant_url/:category_name'),
});

const mapDispatchToProps = {
  removeItemFromCheckout,
};

export default
@withStyles(styles)
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class ClientNav extends PureComponent {
  state = {
    openedDrawer: false,
  };

  toggleDrawer = () => {
    this.setState({ openedDrawer: !this.state.openedDrawer });
  };

  render() {
    const {
      checkoutOrderTotal,
      removeItemFromCheckout,
      order,
      matchParams,
      isCheckoutPage,
      classes,
    } = this.props;

    return (
      <div className="header-nav">
        <Hidden mdUp>
          <IconButton
            aria-label="checkout"
            onClick={this.toggleDrawer}
            disabled={isCheckoutPage}
            className={classes.checkoutMenuTrigger}>
            <Badge
              badgeContent={checkoutOrderTotal.totalOrderItems}
              color="secondary">
              <AddShoppingCartIcon />
            </Badge>
          </IconButton>
          {/* <p
                        
                        
                    </p> */}
          <Drawer
            anchor="right"
            onClose={this.toggleDrawer}
            open={this.state.openedDrawer}>
            <div
              tabIndex={0}
              role="button"
              className={classes.checkoutMenuDrawer}>
              <div>
                <DishOrder
                  order={order}
                  totalPrice={checkoutOrderTotal}
                  removeDishFromOrder={removeItemFromCheckout}
                  restaurant_url={matchParams.restaurant_url}
                  onProcessToCheckoutClick={this.toggleDrawer}
                />
              </div>
            </div>
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

ClientNav.propTypes = {
  order: PropTypes.array,
};

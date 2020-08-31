import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { BookedItem } from '../BookedItem';
import { DishOrderTotal } from '../DishOrderTotal';

import './DishOrder.scss';

export class DishOrder extends PureComponent {
  mapBookedItems() {
    return this.props.order.map((item, index) => {
      return (
        <BookedItem
          key={index}
          dish={item}
          removeDishFromOrder={this.props.removeDishFromOrder}
        />
      );
    });
  }

  render() {
    const {
      totalPrice: { subtotal, deliveryFee, salesTax, total },
      onProcessToCheckoutClick,
      restaurant_url,
      order,
    } = this.props;

    return (
      <div className="dish-order__section">
        <h3>Your order</h3>
        {this.mapBookedItems()}
        <DishOrderTotal
          {...{
            subtotal,
            deliveryFee,
            salesTax,
            total,
            restaurant_url,
          }}
          onProcessToCheckoutClick={onProcessToCheckoutClick}
          showCheckoutBtn={!!order.length}
        />
      </div>
    );
  }
}

DishOrder.propTypes = {
  totalPrice: PropTypes.shape({
    subtotal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    deliveryFee: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    salesTax: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    total: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  showCheckoutBtn: PropTypes.bool,
  order: PropTypes.array,
  restaurant_url: PropTypes.string,
  removeDishFromOrder: PropTypes.func,
};

DishOrder.defaultProps = {
  showCheckoutBtn: true,
};

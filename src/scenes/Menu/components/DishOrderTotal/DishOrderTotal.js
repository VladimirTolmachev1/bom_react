import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { CurrencyService } from '../../../../services';

import './DOT.scss';

export class DishOrderTotal extends Component {
  render() {
    const {
      subtotal,
      deliveryFee,
      salesTax,
      total,
      showCheckoutBtn,
      className,
      restaurant_url,
      onProcessToCheckoutClick,
    } = this.props;

    return (
      <div className={`dish-order__section-total ${className}`}>
        <h4>
          Subtotal <span>${CurrencyService.show(subtotal)}</span>
        </h4>
        <h4>
          Delivery Fee <span>{deliveryFee} %</span>
        </h4>
        <h4>
          Sales Tax <span>{salesTax} %</span>
        </h4>
        <br />
        <h4>
          TOTAL <span>${CurrencyService.show(total)}</span>
        </h4>
        <Link
          to={`/checkout/${restaurant_url}`}
          className="proceed-checkout__btn-link "
          onClick={this.onClickCheckoutButton}>
          {showCheckoutBtn && (
            <Button
              variant="contained"
              color="primary"
              onClick={onProcessToCheckoutClick}>
              Proceed to checkout
            </Button>
          )}
        </Link>
      </div>
    );
  }
}

DishOrderTotal.propTypes = {
  subtotal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  deliveryFee: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  salesTax: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  total: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  showCheckoutBtn: PropTypes.bool,
  className: PropTypes.string,
  restaurant_url: PropTypes.string,
};

DishOrderTotal.defaultProps = {
  showCheckoutBtn: true,
};

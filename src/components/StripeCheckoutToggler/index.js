import React from 'react';
import PropTypes from 'prop-types';
import StripeCheckout from 'react-stripe-checkout';
import { Button, withStyles } from '@material-ui/core';

import styles from './styles';

const CHECKOUT_DESCRIPTION = 'Pay ';
const CHECKOUT_TITLE = 'Pay with stripe';

const StripeCheckoutToggler = ({
  title,
  onToken,
  children,
  stripeKey,
  priceInCoins,
  billingAddress,
  togglerButtonProps,
  submitCheckoutText,
  description,
  classes,
  ...rest
}) => (
  <Button
    color="primary"
    variant="contained"
    {...togglerButtonProps}
    className={`${classes.checkoutBtn} ${togglerButtonProps.className || ''}`}>
    <StripeCheckout
      name={title} // Modal Header
      description={description}
      panelLabel={submitCheckoutText}
      amount={priceInCoins} // 999 - it's $9.99 in cents
      ComponentClass="div" // don't tuch it! Look in './styles.js'
      token={onToken}
      stripeKey={stripeKey}
      billingAddress={billingAddress}
      {...rest}>
      {children}
    </StripeCheckout>
  </Button>
);

StripeCheckoutToggler.defaultProps = {
  billingAddress: false,
  togglerButtonProps: {},
  description: CHECKOUT_DESCRIPTION,
  title: CHECKOUT_TITLE,
};

StripeCheckoutToggler.propTypes = {
  title: PropTypes.string,
  classes: PropTypes.object,
  description: PropTypes.string,
  billingAddress: PropTypes.bool,
  togglerButtonProps: PropTypes.object,
  submitCheckoutText: PropTypes.string,
  onToken: PropTypes.func.isRequired,
  stripeKey: PropTypes.string.isRequired,
  priceInCoins: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

export default withStyles(styles)(StripeCheckoutToggler);

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

import { StripeService } from '../../services';

const StripeConnectionButton = ({
  isConnectedToStripe,
  handleDissconnectStripe,
}) =>
  isConnectedToStripe ? (
    <Button
      variant="outlined"
      color="secondary"
      onClick={handleDissconnectStripe}>
      Dissconnect stripe
    </Button>
  ) : (
    <Button
      href={StripeService.generateStripeOAuthLink()}
      disabled={isConnectedToStripe}
      variant="outlined"
      color="primary">
      Connect stripe
    </Button>
  );

StripeConnectionButton.propTypes = {
  isConnectedToStripe: PropTypes.bool,
  handleDissconnectStripe: PropTypes.func,
};

StripeConnectionButton.defaultProps = {
  isConnectedToStripe: false,
  handleDissconnectStripe: () => null,
};

export default StripeConnectionButton;

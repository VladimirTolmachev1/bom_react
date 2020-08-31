import React from 'react';

import { StripeConnectionButton } from '../../../../components';

const PaymentInfoForm = ({ isConnectedToStripe }) => {
  return (
    <div>
      <StripeConnectionButton isConnectedToStripe={isConnectedToStripe} />
    </div>
  );
};

export default PaymentInfoForm;

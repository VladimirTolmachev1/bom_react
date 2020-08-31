import { deliveryMethods } from './restaurant';
import { paymentMethods } from './payment';

// **********************************************
// OPTIONS FOR SELECTS

// Payment options

export const PAY_NOW_OPTION = {
  name: 'Pay now',
  value: paymentMethods.PAY_NOW,
};

export const PAY_ON_DELIVERY_OPTION = {
  name: 'Pay on delivery',
  value: paymentMethods.PAY_ON_DELIVERY,
};

export const PAY_ON_PICKUP_OPTION = {
  name: 'Pay on pickup',
  value: paymentMethods.PAY_ON_PICKUP,
};

export const paymentOptionsByDeliveryMethod = {
  [deliveryMethods.DELIVERY_ONLY]: [PAY_NOW_OPTION, PAY_ON_DELIVERY_OPTION],
  [deliveryMethods.PICKUP_ONLY]: [PAY_NOW_OPTION, PAY_ON_PICKUP_OPTION],
  [deliveryMethods.PICKUP_AND_DELIVERY]: [
    PAY_NOW_OPTION,
    PAY_ON_DELIVERY_OPTION,
    PAY_ON_PICKUP_OPTION,
  ],
};

// delivery methods options

export const DELIVERY_ONLY_OPTION = {
  name: 'Delivery only',
  value: deliveryMethods.DELIVERY_ONLY,
};

export const PICKUP_ONLY_OPTION = {
  name: 'Pickup only',
  value: deliveryMethods.PICKUP_ONLY,
};

export const PICKUP_AND_DELIVERY_OPTION = {
  name: 'Pickup & delivery',
  value: deliveryMethods.PICKUP_AND_DELIVERY,
};

export const deliveryMethodsOptionsArr = [
  PICKUP_AND_DELIVERY_OPTION,
  DELIVERY_ONLY_OPTION,
  PICKUP_ONLY_OPTION,
];

export const newPaymentMethodByOld = {
  [paymentMethods.PAY_NOW]: paymentMethods.PAY_NOW,
  [paymentMethods.PAY_ON_DELIVERY]: paymentMethods.PAY_ON_PICKUP,
  [paymentMethods.PAY_ON_PICKUP]: paymentMethods.PAY_ON_DELIVERY,
};

// **********************************************

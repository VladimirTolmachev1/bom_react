import { createSelector } from 'reselect';
import { managedRestaurantSelector } from '../restaurants';
import {
  getUnicOrderItemDescriptor,
  dishOrderWithSelectedExtrasDecorator,
} from './checkout.helpers';

export const checkoutSelector = ({ checkout }) => checkout;
export const uuidsByItemDecriptorsSelector = ({ checkout }) =>
  checkout.uuidsByItemDecriptors;
export const allItemsUuidsSelector = ({ checkout }) => checkout.allUuids || [];
export const itemsByUuidsSelector = ({ checkout }) =>
  checkout.itemsByUuids || {};
export const checkoutChargeSelector = ({ checkout }) => checkout.charge;

export const isStripeChargeLoadingSelector = createSelector(
  [checkoutChargeSelector],
  charge => charge.isLoading,
);

export const stripeChargeTransactionIdSelector = createSelector(
  [checkoutChargeSelector],
  charge => charge.stripeTransactionId,
);

export const checkoutItemsSelector = createSelector(
  [itemsByUuidsSelector, allItemsUuidsSelector],
  (byUuids, allUuids) =>
    allUuids.map(uuid => dishOrderWithSelectedExtrasDecorator(byUuids[uuid])),
);

export const checkoutItemsForPaymentsSelector = createSelector(
  [itemsByUuidsSelector, allItemsUuidsSelector],
  (byUuids, allUuids) => {
    const unicItemsByDescriptors = allUuids.reduce(
      (itemsByDescriptors, uuid) => {
        const {
          id,
          amount = 1,
          dish_id,
          selectedExtras = [],
          selectedSize,
        } = dishOrderWithSelectedExtrasDecorator({ ...byUuids[uuid] });

        const item = {
          id,
          amount,
          dish_id,
          selectedExtras: selectedExtras.map(({ id, amount = 1 }) => ({
            id,
            amount,
          })),
        };

        if (selectedSize) {
          item.selectedSize =
            typeof selectedSize === 'object' ? selectedSize.id : selectedSize;
        }

        const descriptor = getUnicOrderItemDescriptor(item);

        if (itemsByDescriptors[descriptor]) {
          itemsByDescriptors[descriptor].amount += item.amount;
        } else {
          itemsByDescriptors[descriptor] = item;
        }

        return itemsByDescriptors;
      },
      {},
    );

    return Object.values(unicItemsByDescriptors);
  },
);

export const totalPriceSelector = createSelector(
  checkoutItemsSelector,
  managedRestaurantSelector,
  (order, { sales_tax = 0, delivery_fee = 0 }) => {
    let subtotal = 0;
    let totalOrderItems = 0;

    order.forEach(item => {
      subtotal += item.totalPrice;
      totalOrderItems += item.amount || 1;
    });

    const totalAll =
      subtotal +
      (subtotal / 100) * Number(delivery_fee) +
      (subtotal / 100) * Number(sales_tax);

    const total = Math.round(totalAll * 100) / 100;

    return {
      totalOrderItems,
      subtotal,
      deliveryFee: delivery_fee,
      salesTax: sales_tax,
      total,
    };
  },
);

export const activeCheckoutStepSelector = ({ checkout }) =>
  checkout.ui.activeStep;

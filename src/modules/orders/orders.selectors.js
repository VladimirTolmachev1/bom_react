import { createSelector } from 'reselect';
import { orderDeliveryMethods, orderStatuses } from '../../constants';

const { DELIVERY, PICKUP } = orderDeliveryMethods;
const {
  NEW,
  IN_PROCESS,
  IN_DELIVERY,
  READY,
  REFUND,
  COMPLETE,
  PENDING,
} = orderStatuses;

export const ordersByIdsSelector = ({ orders }) => orders.byId;
export const allOrdersIdsSelector = ({ orders }) => orders.allIds;
export const isOrdersListLoadingSelector = ({ orders }) =>
  orders.isOrdersListLoading;
export const ordersTotalInfoSelector = ({ orders }) => orders.total;
export const orderIsLoadingSelector = ({ orders }) => orders.isOrderLoading;

export const allOrdersSelector = createSelector(
  [ordersByIdsSelector, allOrdersIdsSelector],
  (byId, allIds) => allIds.map(id => byId[id]),
);

export const ordersByStatusesSelector = createSelector(
  [allOrdersSelector],
  orders => {
    const res = { all: orders };

    orders.forEach(order => {
      if (res[order.status]) {
        res[order.status].push(order);
      } else {
        res[order.status] = [order];
      }
    });

    return res;
  },
);

const generateOrdersByStatusesInitialValues = () => ({
  [NEW]: [],
  [IN_PROCESS]: [],
  [IN_DELIVERY]: [],
  [READY]: [],
  [REFUND]: [],
  [COMPLETE]: [],
  [PENDING]: [],
});

export const ordersByDeliveryMethodsAndStatusesSelector = createSelector(
  [allOrdersSelector],
  orders => {
    const res = {
      [DELIVERY]: generateOrdersByStatusesInitialValues(),
      [PICKUP]: generateOrdersByStatusesInitialValues(),
    };

    orders.forEach(order => {
      res[order.delivery_method][order.status].push(order);
    });

    return res;
  },
);

// save the same link to the same empty object => prevent recomputing clientInfoByOrderIdSelector
const emptyOrder = {};
export const orderByIdFromPropsSelector = ({ orders }, { orderId }) =>
  orders.byId[orderId] || emptyOrder;

export const clientInfoByOrderIdSelector = createSelector(
  [orderByIdFromPropsSelector],
  order => {
    return {
      id: order.id,
      name: order.name,
      phone: order.phone,
      email: order.email,
      street_address: order.street_address,
      zipcode: order.zipcode,
      city: order.city,
      building: order.building,
      appartment: order.appartment,
      delivery_method: order.delivery_method,
      payment_method: order.payment_method,
    };
  },
);

import React from 'react';
import PropTypes from 'prop-types';
import { Grid, withStyles } from '@material-ui/core';

import styles from './styles';
import { DropableOrderStatusColumn } from '../OrderStatusColumn';
import { orderStatuses, orderDeliveryMethods } from '../../../../constants';
import { orderShape } from '../../../../constants/propTypes';

const { READY, REFUND, IN_DELIVERY, IN_PROCESS } = orderStatuses;
const { PICKUP, DELIVERY } = orderDeliveryMethods;

const canDropToPickup = ({ delivery_method, status }) =>
  delivery_method === PICKUP && status !== IN_PROCESS;

const canDropToReadyForPickup = ({ delivery_method, status }) =>
  delivery_method === PICKUP && status !== READY;

const canDropToDelivery = ({ delivery_method, status }) =>
  delivery_method === DELIVERY && status !== IN_PROCESS;

const canDropToDeliveryProcessing = ({ delivery_method, status }) =>
  delivery_method === DELIVERY &&
  ![IN_DELIVERY, READY].find(orderStatus => orderStatus === status);

const ProcessingOrdersTab = ({
  pickupOrders,
  deliveryOrders,
  readyForPickupOrders,
  deliveryProcessingOrders,
  createOrderStatusSetter,
  handleCompleteOrder,
}) => {
  return (
    <Grid container wrap="nowrap" spacing={32}>
      <DropableOrderStatusColumn
        name="Pickup"
        orders={pickupOrders}
        canDrop={canDropToPickup}
        handleDropOrder={createOrderStatusSetter(IN_PROCESS, true)}
        orderPopupActions={[
          {
            name: 'Cancel',
            onClick: createOrderStatusSetter(REFUND),
          },
          {
            name: 'Ready for pickup',
            onClick: createOrderStatusSetter(READY),
          },
        ]}
      />

      <DropableOrderStatusColumn
        name="Ready for pickup"
        orders={readyForPickupOrders}
        canDrop={canDropToReadyForPickup}
        handleDropOrder={createOrderStatusSetter(READY, true)}
        orderPopupActions={[
          {
            name: 'Complete',
            onClick: handleCompleteOrder,
          },
          {
            name: 'Cancel',
            onClick: createOrderStatusSetter(REFUND),
          },
        ]}
      />

      <DropableOrderStatusColumn
        name="Delivery"
        orders={deliveryOrders}
        canDrop={canDropToDelivery}
        handleDropOrder={createOrderStatusSetter(IN_PROCESS, true)}
        orderPopupActions={[
          {
            name: 'Cancel',
            onClick: createOrderStatusSetter(REFUND),
          },
          {
            name: 'Ready for delivery',
            onClick: createOrderStatusSetter(READY),
          },
        ]}
      />

      <DropableOrderStatusColumn
        name="Delivery processing"
        orders={deliveryProcessingOrders}
        canDrop={canDropToDeliveryProcessing}
        handleDropOrder={createOrderStatusSetter(READY, true)}
        orderPopupActions={[
          {
            name: 'In delivery',
            onClick: createOrderStatusSetter(IN_DELIVERY),
            isVisible: ({ status }) => status !== IN_DELIVERY,
          },
          {
            name: 'Complete',
            onClick: handleCompleteOrder,
          },
          {
            name: 'Cancel',
            onClick: createOrderStatusSetter(REFUND),
          },
        ]}
      />
    </Grid>
  );
};

ProcessingOrdersTab.propTypes = {
  createOrderStatusSetter: PropTypes.func.isRequired,
  pickupOrders: PropTypes.arrayOf(PropTypes.shape(orderShape)),
  deliveryOrders: PropTypes.arrayOf(PropTypes.shape(orderShape)),
  readyForPickupOrders: PropTypes.arrayOf(PropTypes.shape(orderShape)),
  deliveryProcessingOrders: PropTypes.arrayOf(PropTypes.shape(orderShape)),
};

ProcessingOrdersTab.defaultProps = {
  pickupOrders: [],
  deliveryOrders: [],
  readyForPickupOrders: [],
  deliveryProcessingOrders: [],
};

export default withStyles(styles)(ProcessingOrdersTab);

import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

import { DropableOrderStatusColumn } from '../OrderStatusColumn';
import { orderStatuses, orderDeliveryMethods } from '../../../../constants';
import { orderShape } from '../../../../constants/propTypes';

const canDropToPickup = ({ delivery_method }) =>
  delivery_method !== orderDeliveryMethods.PICKUP;

const canDropToDelivery = ({ delivery_method }) =>
  delivery_method !== orderDeliveryMethods.DELIVERY;

export const InboxOrdersTab = ({
  pickupOrders,
  deliveryOrders,
  openClientModal,
  createOrderStatusSetter,
  handleDropToPickupNew,
  handleDropToDeliveryNew,
  handleEditOrderClick,
}) => {
  const ordersPopupActions = [
    {
      name: 'Confirm',
      onClick: createOrderStatusSetter(orderStatuses.IN_PROCESS),
    },
    {
      name: 'Edit',
      onClick: handleEditOrderClick,
    },
    {
      name: 'Cancel',
      onClick: createOrderStatusSetter(orderStatuses.REFUND),
    },
    {
      name: 'Client info',
      onClick: openClientModal,
    },
  ];

  return (
    <Grid container wrap="nowrap" spacing={32}>
      <DropableOrderStatusColumn
        name="Pickup"
        orders={pickupOrders}
        canDrop={canDropToPickup}
        handleDropOrder={handleDropToPickupNew}
        orderPopupActions={ordersPopupActions}
      />

      <DropableOrderStatusColumn
        name="Delivery"
        orders={deliveryOrders}
        canDrop={canDropToDelivery}
        handleDropOrder={handleDropToDeliveryNew}
        orderPopupActions={ordersPopupActions}
      />
    </Grid>
  );
};

InboxOrdersTab.propTypes = {
  pickupOrders: PropTypes.arrayOf(PropTypes.shape(orderShape)),
  deliveryOrders: PropTypes.arrayOf(PropTypes.shape(orderShape)),
  openClientModal: PropTypes.func.isRequired,
  createOrderStatusSetter: PropTypes.func.isRequired,
};

InboxOrdersTab.defaultProps = {
  pickupOrders: [],
  deliveryOrders: [],
};

import React from 'react';
import { connect } from 'react-redux';

import { BaseRestauratorOrderModal } from './base';
import {
  isRestauratorOrderCreationModalOpenSelector,
  createOrderFromRestauratorOrderModal,
  isOrderCreationDisabled,
} from '../../../modules/modals/restaurator-order';
import { checkoutItemsSelector } from '../../../modules/checkout';

const mapStateToProps = state => ({
  open: isRestauratorOrderCreationModalOpenSelector(state),
  products: checkoutItemsSelector(state),
  isSubmitDisabled: isOrderCreationDisabled(state),
});

const mapDispatchToProps = {
  onCreateOrder: createOrderFromRestauratorOrderModal,
};

const RestauratorOrderCreationModal = ({
  open,
  products,
  onCreateOrder,
  isSubmitDisabled,
}) => (
  <BaseRestauratorOrderModal
    open={open}
    titleText="New order"
    products={products}
    onFormSubmit={onCreateOrder}
    isSubmitDisabled={isSubmitDisabled}
  />
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RestauratorOrderCreationModal);

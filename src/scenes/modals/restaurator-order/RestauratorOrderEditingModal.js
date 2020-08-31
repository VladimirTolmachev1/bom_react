import React from 'react';
import { connect } from 'react-redux';

import { BaseRestauratorOrderModal } from './base';
import {
  isRestauratorOrderEditingModalOpenSelector,
  activeOrderInfoSelector,
  triggerOrderUpdating,
  isSaveOrderButtonDisabledSelector,
} from '../../../modules/modals/restaurator-order';
import { checkoutItemsSelector } from '../../../modules/checkout';

const mapStateToProps = state => ({
  open: isRestauratorOrderEditingModalOpenSelector(state),
  orderInfo: activeOrderInfoSelector(state),
  products: checkoutItemsSelector(state),
  isSubmitDisabled: isSaveOrderButtonDisabledSelector(state),
});

const mapDispatchToProps = {
  onTriggerOrderUpdating: triggerOrderUpdating,
};

const RestauratorOrderEditingModal = ({
  open,
  onTriggerOrderUpdating,
  isSubmitDisabled,
  initialValues,
  orderInfo,
  products,
}) => (
  <BaseRestauratorOrderModal
    open={open}
    initialValues={initialValues}
    titleText="Editing order"
    onFormSubmit={onTriggerOrderUpdating}
    orderInfo={orderInfo}
    products={products}
    isSubmitDisabled={isSubmitDisabled}
  />
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RestauratorOrderEditingModal);

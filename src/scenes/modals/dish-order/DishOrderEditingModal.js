import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { BaseDishOrderModal } from './base';

import {
  closeDishOrderModal,
  dishOrderEditingInitialValuesSelector,
  isDishOrderEditingModalOpenSelector,
  isDishOrderModalLoadingSelector,
  triggerUpdatingCheckoutItem,
} from '../../../modules/modals/dish-order';

const mapStateToProps = (state, props) => ({
  initialValues: dishOrderEditingInitialValuesSelector(state, props),
  open: isDishOrderEditingModalOpenSelector(state),
  isLoading: isDishOrderModalLoadingSelector(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      triggerUpdatingCheckoutItem,
      closeDishOrderModal,
    },
    dispatch,
  ),
});

const DishOrderEditingModal = ({ initialValues, actions, open, isLoading }) => (
  <BaseDishOrderModal
    open={open}
    initialValues={initialValues}
    submitBtnText="Save order item"
    onFormSubmit={actions.triggerUpdatingCheckoutItem}
    onClose={actions.closeDishOrderModal}
    isLoading={isLoading}
  />
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DishOrderEditingModal);

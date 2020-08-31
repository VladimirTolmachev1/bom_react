import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { BaseDishOrderModal } from './base';
import {
  closeDishOrderModal,
  dishOrderInitialValuesSelector,
  isDishOrderCreationModalOpenSelector,
  isDishOrderModalLoadingSelector,
  triggerPutItemToCheckout,
} from '../../../modules/modals/dish-order';

const mapStateToProps = (state, props) => ({
  initialValues: dishOrderInitialValuesSelector(state, props),
  isLoading: isDishOrderModalLoadingSelector(state),
  open: isDishOrderCreationModalOpenSelector(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      triggerPutItemToCheckout,
      closeDishOrderModal,
    },
    dispatch,
  ),
});

const DishOrderCreationModal = ({
  initialValues,
  actions,
  open,
  isLoading,
  submitBtnText,
  onFormSubmit,
}) => (
  <BaseDishOrderModal
    open={open}
    isLoading={isLoading}
    submitBtnText={submitBtnText}
    onClose={actions.closeDishOrderModal}
    initialValues={initialValues}
    onFormSubmit={onFormSubmit || actions.triggerPutItemToCheckout}
  />
);

DishOrderCreationModal.propTypes = {
  submitBtnText: PropTypes.string,
  onFormSubmit: PropTypes.func,
};

DishOrderCreationModal.defaultProps = {
  submitBtnText: 'Add to cart',
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DishOrderCreationModal);

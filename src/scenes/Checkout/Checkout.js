import React, { PureComponent } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { autobind } from 'core-decorators';

import { HelperService, CurrencyService } from '../../services';
import { Preloader } from '../../components';
import { checkoutStepsNames } from '../../modules/checkout/checkout.constants';

import {
  OrderPlacedTab,
  PaymentDetailsTab,
  ReviewOrderTab,
} from './components';
import {
  isRestaurantsLoadingSelector,
  managedRestaurantSelector,
  getRestaurantForClient,
} from '../../modules/restaurants';

import {
  createOrder,
  // abortPageRequests,
  orderIsLoadingSelector,
  createOrderFromCheckout,
} from '../../modules/orders';

import {
  isStripeChargeLoadingSelector,
  activeCheckoutStepSelector,
  checkoutItemsSelector,
  totalPriceSelector,
  clearCheckout,
  setCheckoutUi,
  backToRestaurantMenu,
  removeItemFromCheckout,
} from '../../modules/checkout';

import { removeDish } from '../../modules/dishes';

import { setDishOrderModal } from '../../modules/modals/dish-order';

import { CheckoutChangeListener } from '../CheckoutChangeListener';

const mapStateToProps = state => ({
  order: checkoutItemsSelector(state),
  totalPrice: totalPriceSelector(state),
  isOrderCreating:
    orderIsLoadingSelector(state) || isStripeChargeLoadingSelector(state),
  restaurantLoading: isRestaurantsLoadingSelector(state),
  restaurant: managedRestaurantSelector(state),
  activeStep: activeCheckoutStepSelector(state),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { activeStep } = stateProps;
  const nextStep = activeStep + 1;

  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,

    actions: {
      handleNextStep: () => dispatch(setCheckoutUi({ activeStep: nextStep })),

      ...bindActionCreators(
        {
          setDishOrderModal,

          removeDish,
          createOrder,
          clearCheckout,
          createOrderFromCheckout,
          getRestaurantForClient,
          removeItemFromCheckout,
          backToRestaurantMenu,
        },
        dispatch,
      ),
    },
  };
};

export default
@connect(
  mapStateToProps,
  null,
  mergeProps,
)
class Checkout extends PureComponent {
  static propTypes = {
    orderForPayment: PropTypes.array,
    order: PropTypes.array,
    setDishExtra: PropTypes.func,
    removeDishExtra: PropTypes.func,
    setDishSize: PropTypes.func,
    removeDish: PropTypes.func,
    restaurant: PropTypes.string,
    restaurantLink: PropTypes.string,
    totalPrice: PropTypes.object,
    orderLoading: PropTypes.bool,
    createOrder: PropTypes.func,
    removeDishFromOrder: PropTypes.func,
  };

  componentDidMount() {
    const {
      order,
      actions,
      history,
      match: { params },
    } = this.props;

    if (!order || !order.length) {
      return history.push(this.getRestaurantLink());
    }

    actions.getRestaurantForClient(params.restaurant_url);
  }

  @autobind
  handleRemoveOrderItemClick({ uuid }) {
    const { actions } = this.props;
    actions.removeItemFromCheckout(uuid);
  }

  @autobind
  onPaymentDetailsSubmit(paymentDetails) {
    const { actions } = this.props;
    actions.createOrderFromCheckout({ paymentDetails });
  }

  getRestaurantLink() {
    const {
      match: { params },
    } = this.props;

    return `/r/${params.restaurant_url}`;
  }

  @autobind
  onBackToMenuClick() {
    const { actions } = this.props;
    actions.backToRestaurantMenu(this.getRestaurantLink());
  }

  @autobind
  handleEditOrderItemClick(item) {
    const { actions } = this.props;

    actions.setDishOrderModal({
      open: true,
      isEditing: true,
      id: item.uuid,
    });
  }

  getStepContent(step) {
    const {
      match: { params },
      actions,
      totalPrice,
      order,
    } = this.props;

    switch (step) {
      case 0: {
        return (
          <ReviewOrderTab
            totalPrice={totalPrice}
            canNextStep={!!order.length}
            order={order}
            restaurant_url={params.restaurant_url}
            handleNextStep={actions.handleNextStep}
            restaurantLink={this.getRestaurantLink()}
            handleRemoveOrderItemClick={this.handleRemoveOrderItemClick}
            handleEditOrderItemClick={this.handleEditOrderItemClick}
          />
        );
      }
      case 1: {
        return (
          <PaymentDetailsTab
            {...HelperService.pick(this.props, [
              'isOrderCreating',
              'restaurant',
              'order',
            ])}
            onSubmit={this.onPaymentDetailsSubmit}
            orderPriceInCoins={CurrencyService.toCoins(totalPrice.total)}
          />
        );
      }
      case 2: {
        return <OrderPlacedTab onBackToMenuClick={this.onBackToMenuClick} />;
      }
      default: {
        return null;
      }
    }
  }

  mapSteps() {
    return checkoutStepsNames.map(label => (
      <Step key={label}>
        <StepLabel>{label}</StepLabel>
      </Step>
    ));
  }

  render() {
    const { restaurantLoading, activeStep } = this.props;

    return (
      <div className="checkout-container app-static-container">
        <CheckoutChangeListener />
        <Stepper
          alternativeLabel
          nonLinear
          activeStep={activeStep}
          className="order-stepper">
          {this.mapSteps()}
        </Stepper>
        {restaurantLoading ? <Preloader /> : this.getStepContent(activeStep)}
      </div>
    );
  }
}

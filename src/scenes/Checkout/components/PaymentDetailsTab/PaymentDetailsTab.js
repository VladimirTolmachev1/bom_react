import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { Field, reduxForm, formValueSelector } from 'redux-form';

import styles from './styles';
import { createOrderCharge } from '../../modules';
import { StripeService } from '../../../../services';
import {
  AppFormTextField,
  AppFormMaskTextField,
  StripeCheckoutToggler,
  AppPreloaderSmall,
  AddressFormFields,
  AppFormSelect,
  AppSwitch,
} from '../../../../components';
import { checkoutValidations } from '../../modules/checkout.validations';
import {
  PHONE_MASK,
  PAY_NOW_OPTION,
  PAY_ON_PICKUP_OPTION,
  PAY_ON_DELIVERY_OPTION,
  DELIVERY_METHOD,
  PICKUP_METHOD,
  deliveryMethods,
  paymentMethods,
} from '../../../../constants';

import './PaymentDetailsTab.scss';

const ORDER_FORM = 'Order form';
const formFieldsSelector = formValueSelector(ORDER_FORM);

const FORM_FIELDS_TO_SELECT = [
  'name',
  'email',
  'phone',
  'city',
  'street_address',
  'building',
  'appartment',
  'zipcode',
  'payment_method',
  'comment',
];

const mapStateToProps = state => ({
  formValues: formFieldsSelector(state, ...FORM_FIELDS_TO_SELECT),
});

export default
@withStyles(styles)
@connect(
  mapStateToProps,
  { createOrderCharge },
)
@reduxForm({
  form: ORDER_FORM,
  enableReinitialize: true,
  validate: checkoutValidations,
})
class PaymentDetailsTab extends PureComponent {
  state = {
    pickupByMySelf: false,
  };

  getPaymentOptions() {
    const {
      restaurant: { delivery_method, connected_stripe },
    } = this.props;
    const { pickupByMySelf } = this.state;

    let resultOptions = [];

    switch (delivery_method) {
      case deliveryMethods.PICKUP_AND_DELIVERY: {
        resultOptions = pickupByMySelf
          ? [PAY_ON_PICKUP_OPTION]
          : [PAY_ON_DELIVERY_OPTION];
        break;
      }

      case deliveryMethods.PICKUP_ONLY: {
        resultOptions = [PAY_ON_PICKUP_OPTION];
        break;
      }

      case deliveryMethods.DELIVERY_ONLY: {
        resultOptions = [PAY_ON_DELIVERY_OPTION];
        break;
      }

      default: {
        console.error(`Unknown delivery method '${delivery_method}' !`);
      }
    }

    if (connected_stripe) {
      resultOptions.push(PAY_NOW_OPTION);
    }

    return resultOptions;
  }

  getOrderDeliveryMethod() {
    return this.hasDelivery() ? DELIVERY_METHOD : PICKUP_METHOD;
  }

  @autobind
  onSubmitClick() {
    const { onSubmit, formValues: body, orderPriceInCoins } = this.props;

    body.total_price = orderPriceInCoins;
    body.delivery_method = this.getOrderDeliveryMethod();

    onSubmit && onSubmit(body);
  }

  @autobind
  async handleStripeCheckout(token) {
    const {
      restaurant: { id },
      createOrderCharge,
      orderPriceInCoins,
    } = this.props;

    try {
      await createOrderCharge({
        body: {
          amount: orderPriceInCoins,
          restaurant_id: +id,
          token: token.id,
        },
      }).promise;

      this.onSubmitClick();
    } catch (error) {
      console.error(error);
    }
  }

  @autobind
  onChangeZipCode({ value = '', city }) {
    const { change } = this.props;
    change('zipcode', value);
    change('city', city);
  }

  hasDelivery() {
    if (
      this.props.restaurant.delivery_method === deliveryMethods.PICKUP_ONLY ||
      this.state.pickupByMySelf
    ) {
      return false;
    }

    return true;
  }

  @autobind
  handleDeliveryMethodChange({ target: { checked } }) {
    this.setState({
      pickupByMySelf: checked,
    });
  }

  render() {
    const {
      restaurant: { delivery_method },
      formValues: { zipcode, payment_method },
      isOrderCreating,
      orderPriceInCoins,
      invalid,
      classes,
    } = this.props;

    const { pickupByMySelf } = this.state;

    const isAddressRequired = this.hasDelivery();

    return (
      <div className="order-placement-tab">
        <div className="order-placement-tab__user-form">
          <form className="order-placement__form">
            {isOrderCreating && <AppPreloaderSmall />}
            <Field
              required
              multiline
              name="name"
              label="Your name"
              component={AppFormTextField}
            />

            <Field
              required
              name="email"
              type="email"
              label="Your Email"
              component={AppFormTextField}
            />

            <Field
              required
              name="phone"
              label="Phone number"
              mask={PHONE_MASK}
              component={AppFormMaskTextField}
            />

            {delivery_method === deliveryMethods.PICKUP_AND_DELIVERY && (
              <AppSwitch
                label="Choose delivery service"
                offCaption="Delivery"
                onCaption="Pickup"
                onChange={this.handleDeliveryMethodChange}
                checked={pickupByMySelf}
              />
            )}

            <Field
              required
              withoutNone
              name="payment_method"
              label="Select payment method"
              options={this.getPaymentOptions()}
              component={AppFormSelect}
            />

            {isAddressRequired && (
              <AddressFormFields
                zipcode={zipcode}
                onChangeZipCode={this.onChangeZipCode}
              />
            )}

            <Field
              multiline
              name="comment"
              label="Comment to the order"
              component={AppFormTextField}
              className={classes.orderCommentField}
            />

            {payment_method === paymentMethods.PAY_NOW ? (
              <StripeCheckoutToggler
                togglerButtonProps={{
                  disabled: Boolean(isOrderCreating || invalid),
                }}
                stripeKey={StripeService.getStripePublishKey()}
                onToken={this.handleStripeCheckout}
                priceInCoins={orderPriceInCoins}
                title="Pay for order">
                Pay and place
              </StripeCheckoutToggler>
            ) : (
              <Button
                onClick={this.onSubmitClick}
                variant="contained"
                color="primary"
                disabled={isOrderCreating || invalid}>
                Place my order
              </Button>
            )}
          </form>
        </div>
      </div>
    );
  }
}

PaymentDetailsTab.propTypes = {
  restaurant: PropTypes.object,
  isOrderCreating: PropTypes.bool,
};

import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';

import { FormTextField, AppSwitch } from '../..';
import { CLIENT_INFO_FORM } from '../constants/form.names';
import {
  paymentMethods,
  deliveryMethods,
  orderDeliveryMethods,
  PHONE_MASK,
} from '../../../constants';
import { clientInfoFormFieldsSelector } from '../selectors';
import { checkoutValidations } from '../../../scenes/Checkout/modules';
import { managedRestaurantSelector } from '../../../modules/restaurants';
import FormMaskTextField from '../../FormMaskTextField';

const { DELIVERY, PICKUP } = orderDeliveryMethods;
const { PAY_ON_DELIVERY, PAY_ON_PICKUP } = paymentMethods;

function ClientInfoForm({ deliveryMethod, change, restaurantDeliveryMethod }) {
  const handleDeliveryMethodChange = useCallback(
    ({ target: { checked } }) => {
      const newDeliverymethod = checked ? PICKUP : DELIVERY;
      const newPaymentMethod = checked ? PAY_ON_PICKUP : PAY_ON_DELIVERY;

      change('delivery_method', newDeliverymethod);
      change('payment_method', newPaymentMethod);
    },
    [change],
  );

  const isPickup = deliveryMethod === PICKUP;

  const showSwitch =
    restaurantDeliveryMethod === deliveryMethods.PICKUP_AND_DELIVERY;

  const showAddress =
    !isPickup && restaurantDeliveryMethod !== deliveryMethods.PICKUP_ONLY;

  return (
    <Grid container spacing={16} direction="column">
      <Grid item>
        <Typography variant="subheading">Contacts</Typography>
        <Grid container spacing={16}>
          <Grid item>
            <Field
              name="name"
              label="Name"
              component={FormTextField}
              fullWidth
              required
            />
          </Grid>
          <Grid item>
            <Field
              name="email"
              label="Email"
              component={FormTextField}
              fullWidth
              required
            />
          </Grid>
          <Grid item>
            <Field
              name="phone"
              label="Phone"
              mask={PHONE_MASK}
              component={FormMaskTextField}
              fullWidth
              required
            />
          </Grid>
        </Grid>
      </Grid>
      {showSwitch && (
        <Grid item>
          <Typography variant="subheading">Delivery service</Typography>
          <AppSwitch
            offCaption="Delivery"
            onCaption="Pickup"
            onChange={handleDeliveryMethodChange}
            checked={isPickup}
          />
        </Grid>
      )}

      {showAddress && (
        <Grid item>
          <Typography variant="subheading">Address</Typography>
          <Grid container spacing={16}>
            <Grid item>
              <Field
                name="city"
                label="City"
                component={FormTextField}
                fullWidth
                required
              />
            </Grid>
            <Grid item>
              <Field
                name="street_address"
                label="Street"
                component={FormTextField}
                fullWidth
                required
              />
            </Grid>
            <Grid item>
              <Field
                name="building"
                label="Building"
                component={FormTextField}
                fullWidth
                required
              />
            </Grid>
            <Grid item>
              <Field
                name="appartment"
                label="Apartment"
                component={FormTextField}
                fullWidth
                required
              />
            </Grid>
          </Grid>
        </Grid>
      )}
      <Grid item>
        <Typography variant="subheading" paragraph>
          Comment to order
        </Typography>
        <Field
          name="comment"
          label="Comment"
          component={FormTextField}
          multiline
          rows={4}
          fullWidth
        />
      </Grid>
    </Grid>
  );
}

ClientInfoForm.propTypes = {
  deliveryMethod: PropTypes.string,
  restaurantDeliveryMethod: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  deliveryMethod: clientInfoFormFieldsSelector(state, 'delivery_method'),
  restaurantDeliveryMethod: managedRestaurantSelector(state).delivery_method,
});

export default connect(mapStateToProps)(
  reduxForm({
    form: CLIENT_INFO_FORM,
    enableReinitialize: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: false,
    updateUnregisteredFields: true,
    keepDirtyOnReinitialize: true,
    validate: checkoutValidations,
  })(ClientInfoForm),
);

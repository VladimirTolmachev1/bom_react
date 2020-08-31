import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import {
  reduxForm,
  formValueSelector,
  isPristine,
  isInvalid,
  submit,
} from 'redux-form';

import { Button, withStyles, Grid } from '@material-ui/core';

import styles from './styles';
import EstimatedTimeField from '../EstimatedTimeField';
import { CuisineAutoComplete } from '../../../CuisineAutoComplete';
import { ZipCodeAutoComplete } from '../../../ZipCodeAutoComplete';
import { restaurantModalValidation } from '../../../RestaurantModal/modules';
import { managedRestaurantSelector } from '../../../../modules/restaurants';
import {
  deliveryMethodsOptionsArr,
  PHONE_MASK,
  METHODS_WITH_DELIVERY_ARR,
} from '../../../../constants';

import {
  FormSelect,
  GridReduxFormField,
  FullScreenPreloader,
  FormMaskTextField,
  FormTextField,
} from '../../../../components';

const RESTAURANTS_SETTINGS_FORM = 'Restaurant settings';

const formFieldsSelector = formValueSelector(RESTAURANTS_SETTINGS_FORM);
const isInvalidSelector = isInvalid(RESTAURANTS_SETTINGS_FORM);
const isPristineSelector = isPristine(RESTAURANTS_SETTINGS_FORM);

const VALUES_TO_SUBMIT = [
  'city',
  'state',
  'zipcode',
  'sales_tax',
  'delivery_fee',
  'phone_number',
  'phone_number2',
  'subscription',
  'cuisine_type',
  'manager_name',
  'manager_email',
  'delivery_email',
  'street_address',
  'delivery_method',
  'restaurant_name',
];

const mapStateToProps = state => ({
  valuesToSubmit: formFieldsSelector(state, ...VALUES_TO_SUBMIT),
  cuisineName: formFieldsSelector(state, 'cuisine_name'),
  zipcodeNumbers: formFieldsSelector(state, 'zip_code'),
  initialValues: managedRestaurantSelector(state),
  isPristine: isPristineSelector(state),
  isInvalid: isInvalidSelector(state),
});

@connect(
  mapStateToProps,
  { submit },
)
@withStyles(styles)
@reduxForm({
  form: RESTAURANTS_SETTINGS_FORM,
  validate: restaurantModalValidation, // same validation rules
  enableReinitialize: true,
})
class RestaurantInfoForm extends PureComponent {
  @autobind
  onChangeCuisine({ value, label }) {
    const { change } = this.props;
    change('cuisine_type', value);
    change('cuisine_name', label);
  }

  @autobind
  onChangeZipCode({ value, city, state, zipcode }) {
    const { change } = this.props;
    change('city', city);
    change('state', state);
    change('zipcode', value); // zipcode id
    change('zip_code', zipcode); // zipcode numbers
  }

  @autobind
  onSave() {
    const { valuesToSubmit, onSubmit } = this.props;
    onSubmit(valuesToSubmit);
  }

  getCommonPropsForAutocompleteField() {
    const { classes } = this.props;

    return {
      autoCompleteWrpClasses: classes.autoCompleteWrpClasses,
      wrapperClassName: classes.autoselectWrapper,
      compareKey: 'value',
      textFieldProps: {
        className: classes.selectTextField,
        margin: 'dense',
        variant: 'outlined',
        inputProps: {
          className: classes.selectTextFieldInput,
        },
      },
    };
  }

  getCuisineSelectedOption() {
    const {
      cuisineName,
      valuesToSubmit: { cuisine_type },
    } = this.props;
    if (cuisineName && cuisine_type) {
      return {
        label: cuisineName,
        value: cuisine_type,
      };
    }

    return null;
  }

  getZipcodeSelectedOption() {
    const {
      zipcodeNumbers,
      valuesToSubmit: { zipcode, city, state },
    } = this.props;

    if (zipcodeNumbers && city && state && zipcode) {
      return {
        label: `${zipcodeNumbers} ${city} ${state}`,
        value: zipcode,
      };
    }

    return null;
  }

  hasDelivery() {
    return METHODS_WITH_DELIVERY_ARR.some(
      method => method === this.props.valuesToSubmit.delivery_method,
    );
  }

  render() {
    const {
      valuesToSubmit: { cuisine_type, zipcode },
      openRestaurantsHorsModal,
      initialValues,
      isPristine,
      isInvalid,
      isLoading,
      classes,
    } = this.props;

    const {
      restaurant_name,
      phone_number,
      phone_number2,
      manager_name,
      manager_email,
      street_address,
      delivery_email,
      cuisine_name,
      sales_tax,
      zip_code,
      state,
      city,
    } = initialValues;

    const autocompleteFieldCommonProps = this.getCommonPropsForAutocompleteField();

    return (
      <>
        <Grid container spacing={32}>
          <Grid
            className={classes.contactsSectionWrapper}
            direction="column"
            spacing={32}
            container
            item>
            <GridReduxFormField
              caption={restaurant_name}
              label="Restaurant name"
              name="restaurant_name"
              component={FormTextField}
            />

            <GridReduxFormField
              caption={phone_number}
              label="Phone number"
              name="phone_number"
              mask={PHONE_MASK}
              component={FormMaskTextField}
              margin="dense"
              variant="outlined"
            />

            <GridReduxFormField
              caption={phone_number2}
              label="Additional phone number"
              name="phone_number2"
              mask={PHONE_MASK}
              component={FormMaskTextField}
              margin="dense"
              variant="outlined"
            />

            <GridReduxFormField
              caption={manager_name}
              label="Manager's name"
              name="manager_name"
              component={FormTextField}
            />

            <GridReduxFormField
              caption={manager_email}
              label="Manager's email"
              name="manager_email"
              component={FormTextField}
            />

            <GridReduxFormField
              caption={delivery_email}
              label="Delivery email"
              name="delivery_email"
              component={FormTextField}
            />

            <GridReduxFormField
              caption={cuisine_name}
              name="cuisine"
              component={() => (
                <CuisineAutoComplete
                  isClearable={false}
                  value={cuisine_type}
                  selectedOption={this.getCuisineSelectedOption()}
                  onChange={this.onChangeCuisine}
                  {...autocompleteFieldCommonProps}
                />
              )}
            />

            <GridReduxFormField
              caption={zip_code}
              name="zipcode"
              component={() => (
                <ZipCodeAutoComplete
                  value={zipcode}
                  withPagination
                  selectedOption={this.getZipcodeSelectedOption()}
                  onChange={this.onChangeZipCode}
                  {...autocompleteFieldCommonProps}
                />
              )}
            />

            <GridReduxFormField
              caption={state}
              label="State"
              name="state"
              component={FormTextField}
            />

            <GridReduxFormField
              caption={city}
              label="City"
              name="city"
              component={FormTextField}
            />

            <GridReduxFormField
              caption={street_address}
              label="Street"
              name="street_address"
              component={FormTextField}
            />

            <GridReduxFormField
              caption={sales_tax}
              label="Sales tax"
              name="sales_tax"
              component={FormTextField}
            />
          </Grid>

          <Grid
            className={classes.settingsSectionWrapper}
            direction="column"
            spacing={32}
            container
            item>
            <GridReduxFormField
              caption="Delivery service"
              name="delivery_method"
              gridProps={{
                justify: 'flex-start',
              }}
              captionClassName={classes.smallCaption}
              component={FormSelect}
              options={deliveryMethodsOptionsArr}
              withoutNone
              outlined
            />

            {this.hasDelivery() && (
              <GridReduxFormField
                caption="Delivery fee"
                name="delivery_fee"
                type="number"
                gridProps={{
                  justify: 'flex-start',
                }}
                inputProps={{
                  step: 0.01,
                }}
                captionClassName={classes.smallCaption}
                component={FormTextField}
                className={classes.deliveryFeeTextField}
              />
            )}

            <EstimatedTimeField
              label="Estimated pickup time"
              name="estimated_pickup_time"
            />

            <EstimatedTimeField
              label="Estimated delivery time"
              name="estimated_delivery_time"
            />

            <Grid item>
              <Button
                className={classes.button}
                onClick={openRestaurantsHorsModal}
                variant="outlined"
                color="primary">
                Set working hours
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Button
          onClick={this.onSave}
          variant="contained"
          type="sumbit"
          color="primary"
          className={classes.button}
          disabled={isLoading || isInvalid || isPristine}>
          Save
        </Button>

        {isLoading && <FullScreenPreloader />}
      </>
    );
  }
}

RestaurantInfoForm.propTypes = {
  openRestaurantsHorsModal: PropTypes.func.isRequired,
  zipcodeNumbers: PropTypes.string,
  valuesToSubmit: PropTypes.object,
  initialValues: PropTypes.object,
  cuisineName: PropTypes.string,
  isPristine: PropTypes.bool,
  isInvalid: PropTypes.bool,
  isLoading: PropTypes.bool,
  classes: PropTypes.object,
};

export default RestaurantInfoForm;

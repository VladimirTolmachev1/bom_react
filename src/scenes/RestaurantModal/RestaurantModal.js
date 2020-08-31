import React, { Component, Fragment } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core';

import styles from './styles';
import {
  AppFormTextField,
  AppFormSelect,
  AppPreloaderSmall,
  AppFormMaskTextField,
  AppCleanHOC,
} from '../../components';
import { dictionarySelector } from '../../modules/core/core.selectors';
import { HelperService } from '../../services';
import { AgentsAutoComplete } from '../Agents';
import { ZipCodeAutoComplete } from '../ZipCodeAutoComplete';
import { CuisineAutoComplete } from '../CuisineAutoComplete';
import './RestaurantsModal.scss';
import {
  restaurantModalSelector,
  toggleRestaurantsModal,
  setMode,
  clearModalData,
  restaurantModalValidation,
  getInfoByPostalCode,
} from './modules';
import {
  createRestaurant,
  updateRestaurant,
  getRestaurantById,
  abortPageRequests,
} from '../../modules/restaurants';

import { PHONE_MASK, METHODS_WITH_DELIVERY_ARR } from '../../constants';

const formFieldsSelector = formValueSelector('Restaurant');

const mapStateToProps = state => ({
  restaurantModal: restaurantModalSelector(state),
  dictionary: dictionarySelector(state),
  agent_name: formFieldsSelector(state, 'agent_name'),
  subscription: formFieldsSelector(state, 'subscription'),
  restaurant_name: formFieldsSelector(state, 'restaurant_name'),
  manager_name: formFieldsSelector(state, 'manager_name'),
  manager_email: formFieldsSelector(state, 'manager_email'),
  delivery_email: formFieldsSelector(state, 'delivery_email'),
  phone_number: formFieldsSelector(state, 'phone_number'),
  phone_number2: formFieldsSelector(state, 'phone_number2'),
  sales_tax: formFieldsSelector(state, 'sales_tax'),
  zipcode: formFieldsSelector(state, 'zipcode'),
  cuisine_type: formFieldsSelector(state, 'cuisine_type'),
  delivery_method: formFieldsSelector(state, 'delivery_method'),
  street_address: formFieldsSelector(state, 'street_address'),
  delivery_fee: formFieldsSelector(state, 'delivery_fee'),
  state: formFieldsSelector(state, 'state'),
  city: formFieldsSelector(state, 'city'),
  tags: formFieldsSelector(state, 'tags'),
  initialValues: restaurantModalSelector(state).initialValues,
});

const mapDispatchToProps = {
  toggleRestaurantsModal,
  createRestaurant,
  getRestaurantById,
  updateRestaurant,
  abortPageRequests,
  setMode,
  clearModalData,
  getInfoByPostalCode,
};

export default
@withStyles(styles)
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
@reduxForm({
  form: 'Restaurant',
  enableReinitialize: true,
  validate: restaurantModalValidation,
})
@AppCleanHOC
class RestaurantModal extends Component {
  @autobind
  onEntered() {
    const {
      restaurantModal: { mode, id },
      getRestaurantById,
    } = this.props;
    if (mode === 'edit') {
      getRestaurantById({ id });
    }
  }

  getDialogTitle() {
    const {
      restaurantModal: { mode },
    } = this.props;
    const action = mode === 'add' ? 'Add new' : 'Edit';

    return `${action} restaurant's information`;
  }

  hasDelivery() {
    return METHODS_WITH_DELIVERY_ARR.some(
      method => method === this.props.delivery_method,
    );
  }

  getModalAction() {
    const {
      restaurantModal: { loading, mode },
      pristine,
      invalid,
    } = this.props;

    return (
      <Fragment>
        <Button
          onClick={this.onClose}
          variant="contained"
          disabled={loading}
          className="restaurant-modal__actions-cancel">
          Cancel
        </Button>
        <Button
          onClick={this.onActionAndCloseCLick}
          variant="contained"
          type="submit"
          disabled={loading || invalid || pristine}
          className="restaurant-modal__actions-save-close"
          color="secondary">
          {mode === 'edit' ? 'Update' : 'Save'} and close
        </Button>
        <Button
          onClick={this.onActionAndAddAnotherCLick}
          variant="contained"
          type="submit"
          disabled={loading || invalid || pristine}
          className="restaurant-modal__actions-save-add">
          {mode === 'edit' ? 'Update' : 'Save'} and Add another Restaurant
        </Button>
      </Fragment>
    );
  }

  requestAction() {
    const {
      createRestaurant,
      updateRestaurant,
      restaurantModal: { mode, id },
    } = this.props;

    const body = HelperService.pick(this.props, [
      'agent_name',
      'restaurant_name',
      'subscription',
      'manager_name',
      'manager_email',
      'delivery_email',
      'phone_number',
      'phone_number2',
      'sales_tax',
      'cuisine_type',
      'zipcode',
      'street_address',
      'city',
      'state',
      'tags',
      'delivery_method',
      'delivery_fee',
    ]);

    const request =
      mode === 'add'
        ? createRestaurant({ body })
        : updateRestaurant({ body: { ...body, id } });

    return request.promise;
  }

  @autobind
  onActionAndCloseCLick(event) {
    const { toggleRestaurantsModal, reset } = this.props;
    event.preventDefault();
    event.stopPropagation();
    this.requestAction()
      .then(reset)
      .then(() => toggleRestaurantsModal(false));
  }

  @autobind
  onActionAndAddAnotherCLick(event) {
    const { reset, setMode } = this.props;
    event.preventDefault();
    event.stopPropagation();
    this.requestAction()
      .then(reset)
      .then(() => setMode({ mode: 'add' }));
  }

  @autobind
  onClose() {
    const { reset, toggleRestaurantsModal, clearModalData } = this.props;
    reset();
    toggleRestaurantsModal(false);
    clearModalData();
  }

  @autobind
  onChangeAgent({ agent_name = '' }) {
    const { change } = this.props;
    change('agent_name', agent_name);
  }

  @autobind
  onChangeCuisine(selectedOption) {
    const { change } = this.props;
    change('cuisine_type', selectedOption.value);
  }

  @autobind
  onChangeZipCode({ value = '', city, state }) {
    const { change } = this.props;
    change('zipcode', value);
    change('city', city);
    change('state', state);
  }

  render() {
    const {
      restaurantModal: { open, loading },
      dictionary,
      agent_name,
      cuisine_type,
      zipcode,
      classes,
    } = this.props;

    return (
      <Dialog
        open={open}
        onEntered={this.onEntered}
        onClose={this.onClose}
        fullWidth
        maxWidth="md"
        className="restaurant-modal">
        <form className="restaurant__form">
          {loading && <AppPreloaderSmall />}
          <DialogTitle>{this.getDialogTitle()}</DialogTitle>

          <DialogContent className={classes.modalContent}>
            <div className="restaurant-modal__content">
              <div className="restaurant-modal__content-left">
                <AgentsAutoComplete
                  value={agent_name}
                  onChange={this.onChangeAgent}
                />
                <Field
                  name="restaurant_name"
                  required
                  type="text"
                  label="Restaurant Name"
                  component={AppFormTextField}
                />
                <Field
                  name="manager_name"
                  required
                  type="text"
                  label={"Restaurant Manager's Name"}
                  component={AppFormTextField}
                />
                <Field
                  name="manager_email"
                  required
                  type="text"
                  label={"Restaurant Manager's Email"}
                  component={AppFormTextField}
                />
                <Field
                  name="delivery_email"
                  type="text"
                  label="Restaurant Delivery Email"
                  component={AppFormTextField}
                />

                <CuisineAutoComplete
                  value={cuisine_type}
                  compareKey="value"
                  onChange={this.onChangeCuisine}
                />

                <Field
                  name="phone_number"
                  label="Phone number"
                  mask={PHONE_MASK}
                  component={AppFormMaskTextField}
                />

                <Field
                  name="phone_number2"
                  label="Additional phone number"
                  mask={PHONE_MASK}
                  component={AppFormMaskTextField}
                />

                <Field
                  className="restaurant-modal__field"
                  name="sales_tax"
                  type="number"
                  label="Sales Tax"
                  component={AppFormTextField}
                />
              </div>
              <div className="restaurant-modal__content-right">
                <Field
                  name="delivery_method"
                  required
                  options={dictionary.delivery_method || []}
                  label="Select delivery method"
                  component={AppFormSelect}
                />

                {this.hasDelivery() && (
                  <Field
                    name="delivery_fee"
                    type="number"
                    label="Delivery fee"
                    component={AppFormTextField}
                    inputProps={{
                      step: 0.01,
                    }}
                  />
                )}
                <Field
                  name="subscription"
                  required
                  options={dictionary.subscriptions}
                  label="Select subscription"
                  component={AppFormSelect}
                />
                <Field
                  name="street_address"
                  required
                  type="text"
                  multiline
                  label="Enter street address"
                  component={AppFormTextField}
                />

                <ZipCodeAutoComplete
                  value={zipcode}
                  compareKey="value"
                  onChange={this.onChangeZipCode}
                />

                <Field
                  name="city"
                  required
                  type="text"
                  multiline
                  label="Enter city"
                  component={AppFormTextField}
                />
                <Field
                  name="state"
                  required
                  type="text"
                  multiline
                  label="Enter state"
                  component={AppFormTextField}
                />
                <Field
                  name="tags"
                  type="text"
                  multiline
                  rows={2}
                  label="Add keywords like your best dishes and services"
                  component={AppFormTextField}
                />
              </div>
            </div>
          </DialogContent>

          <Divider className="restaurant-modal__divider" />
          <DialogActions className="restaurant-modal__actions">
            {this.getModalAction()}
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

RestaurantModal.propTypes = {};
RestaurantModal.defaultProps = {};

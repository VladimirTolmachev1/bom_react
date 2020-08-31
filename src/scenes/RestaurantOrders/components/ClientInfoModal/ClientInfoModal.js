import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import {
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Divider,
  Button,
  withStyles,
} from '@material-ui/core';

import styles from './styles';
import { AppSwitch, InfoSection } from '../../../../components';
import { clientInfoByOrderIdSelector } from '../../../../modules/orders';
import { HelperService } from '../../../../services';
import {
  orderDeliveryMethods,
  deliveryMethods,
  paymentMethods,
} from '../../../../constants';
import { orderShape } from '../../../../constants/propTypes';
import { checkoutValidations } from '../../../Checkout/modules/checkout.validations';

const { DELIVERY, PICKUP } = orderDeliveryMethods;
const { PAY_ON_DELIVERY, PAY_ON_PICKUP } = paymentMethods;

const ORDER_CLIENT = 'Order clietn form';
const formFieldsSelector = formValueSelector(ORDER_CLIENT);

// field-level redux-form validator
const required = value => (value ? undefined : 'Required');

const FORM_FIELDS_TO_SELECT = [
  'id',
  'name',
  'email',
  'phone',
  'city',
  'street_address',
  'building',
  'appartment',
  'delivery_method',
  'payment_method',
];

const mapStateToProps = (state, { order }) => ({
  order: formFieldsSelector(state, ...FORM_FIELDS_TO_SELECT),
  initialValues: clientInfoByOrderIdSelector(state, { orderId: order.id }),
});

export default
@connect(mapStateToProps)
@withStyles(styles)
@reduxForm({
  form: ORDER_CLIENT,
  enableReinitialize: true,
  validate: checkoutValidations,
})
class ClientInfoModal extends Component {
  static propTypes = {
    title: PropTypes.string,
    isEditing: PropTypes.bool,
    toggleEditing: PropTypes.func,
    canToggleEdit: PropTypes.bool,
    submitBtnText: PropTypes.string,
    closeBtnText: PropTypes.string,
    hideOrderDetails: PropTypes.bool,
    showAdrressDetails: PropTypes.bool,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    restaurantDeliveryMethod: PropTypes.string,
    order: PropTypes.oneOfType([PropTypes.shape(orderShape), PropTypes.object]),
  };

  static defaultProps = {
    submitBtnText: 'Save',
    closeBtnText: 'Close',
    title: 'Сlient info',
    canToggleEdit: true,
    hideOrderDetails: false,
    showAdrressDetails: false,
    isEditing: false,
  };

  @autobind
  onSubmit() {
    const { order, onSubmit } = this.props;
    onSubmit && onSubmit(order);
  }

  @autobind
  handleDeliveryMethodChange({ target: { checked } }) {
    const { change } = this.props;

    const newDeliverymethod = checked ? PICKUP : DELIVERY;
    const newPaymentMethod = checked ? PAY_ON_PICKUP : PAY_ON_DELIVERY;

    change('delivery_method', newDeliverymethod);
    change('payment_method', newPaymentMethod);
  }

  isPickupMethod() {
    return this.props.order.delivery_method === PICKUP;
  }

  @autobind
  renderEditDeliveryMethod() {
    const { restaurantDeliveryMethod } = this.props;

    if (restaurantDeliveryMethod !== deliveryMethods.PICKUP_AND_DELIVERY) {
      return null;
    }

    return (
      <Grid item key="delivery_method">
        <AppSwitch
          offCaption="Delivery"
          onCaption="Pickup"
          onChange={this.handleDeliveryMethodChange}
          checked={this.isPickupMethod()}
        />
      </Grid>
    );
  }

  renderActions() {
    const {
      invalid,
      isEditing,
      closeBtnText,
      submitBtnText,
      onClose,
      classes,
    } = this.props;
    return (
      <>
        <Button
          onClick={onClose}
          variant="contained"
          color={isEditing ? 'default' : 'primary'}>
          {closeBtnText}
        </Button>

        {isEditing && (
          <Button
            className={classes.saveButton}
            onClick={this.onSubmit}
            variant="contained"
            color="primary"
            disabled={invalid}>
            {submitBtnText}
          </Button>
        )}
      </>
    );
  }

  render() {
    const {
      open,
      order,
      title,
      onClose,
      classes,
      isEditing,
      toggleEditing,
      canToggleEdit,
      hideOrderDetails,
      showAdrressDetails,
    } = this.props;
    return (
      <Dialog
        open={open}
        fullWidth
        onClose={onClose}
        maxWidth="sm"
        className="category-modal">
        <DialogTitle>
          <Grid container alignItems="center" justify="space-between">
            {title}
            {canToggleEdit && (
              <IconButton
                onClick={toggleEditing}
                className={classes.editIconButton}>
                <EditIcon />
              </IconButton>
            )}
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            spacing={16}
            className={classes.mainSectionWrapper}
            wrap="wrap"
            direction="column">
            <InfoSection
              isEditing={isEditing}
              header="Contacts:"
              editingItemsProps={{
                className: classes.editingItem,
              }}
              items={[
                {
                  name: 'name',
                  label: 'Name',
                  value: order.name,
                },
                {
                  name: 'email',
                  label: 'Email',
                  value: order.email,
                },
                {
                  name: 'phone',
                  label: 'Phone',
                  value: order.phone,
                },
              ]}
            />

            {(!this.isPickupMethod() || showAdrressDetails) && (
              <InfoSection
                header="Address:"
                isEditing={isEditing}
                editingItemsProps={{
                  className: classes.editingItem,
                  validate: required,
                }}
                items={[
                  {
                    name: 'city',
                    label: 'City',
                    value: order.city,
                  },
                  {
                    name: 'street_address',
                    label: 'Street',
                    value: order.street_address,
                  },
                  {
                    name: 'building',
                    label: 'Building',
                    value: order.building,
                  },
                  {
                    name: 'appartment',
                    label: 'Apartment',
                    value: order.appartment,
                  },
                ]}
              />
            )}

            {!hideOrderDetails && (
              <InfoSection
                isEditing={isEditing}
                header={isEditing ? 'Delivery service' : 'Order:'}
                items={[
                  {
                    label: 'Delivery method',
                    value: HelperService.constToReadableText(
                      order.delivery_method,
                    ),
                    renderEditing: this.renderEditDeliveryMethod,
                  },
                  {
                    label: 'Payment method',
                    value: HelperService.constToReadableText(
                      order.payment_method,
                    ),
                    renderEditing: () => null,
                  },
                ]}
              />
            )}
          </Grid>

          {(order.comment || isEditing) && !hideOrderDetails && (
            <InfoSection
              isEditing={isEditing}
              className={classes.commentSection}
              header="Comment to order:"
              items={[
                {
                  value: order.comment,
                  name: 'comment',
                  multiline: true,
                  className: classes.editCommentField,
                },
              ]}
            />
          )}
        </DialogContent>
        <Divider />
        <DialogActions>{this.renderActions()}</DialogActions>
      </Dialog>
    );
  }
}

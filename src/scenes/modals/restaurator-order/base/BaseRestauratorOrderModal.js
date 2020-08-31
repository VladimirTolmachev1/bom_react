import React, { PureComponent } from 'react';
// import PropTypes from "prop-types";
import {
  Grid,
  withStyles,
  Drawer,
  Typography,
  Tabs,
  Tab,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Button,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';

import { DishAutocomplete } from '../../../DishAutocomplete';
import { ReviewOrderItem } from '../../../Checkout/components';
import { ClientInfoForm } from '../../../../components/forms';
import { CurrencyService } from '../../../../services';
import {
  DishOrderEditingModal,
  DishOrderCreationModal,
} from '../../dish-order';

import { managedRestaurantIdSelector } from '../../../../modules/restaurants';

import {
  totalPriceSelector,
  removeItemFromCheckout,
} from '../../../../modules/checkout';
import {
  orderModalStepValues as steps,
  restauratorOrderModalStepSelector,
  openOrderItemCreationModal,
  addItemToOrder,
  openOrderItemForEditing,
  closeRestauratorOrderModal,
  setRestauratorOrderModal,
} from '../../../../modules/modals/restaurator-order';
import { getDishById } from '../../../../modules/dishes';
import styles from './styles';

const mapStateToProps = state => ({
  modalStep: restauratorOrderModalStepSelector(state),
  orderPrice: totalPriceSelector(state),
  restaurantId: managedRestaurantIdSelector(state),
});

const mapDispatchToProps = {
  onCloseRestauratorOrderModal: closeRestauratorOrderModal,
  onOpenOrderItemForEditing: openOrderItemForEditing,
  onOpenOrderItemCreationModal: openOrderItemCreationModal,
  onAddItemToOrder: addItemToOrder,
  onGetDishById: getDishById,
  onRemoveItemFromCheckout: removeItemFromCheckout,
  onSetRestauratorOrderModal: setRestauratorOrderModal,
};

export default
@withStyles(styles)
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class BaseRestauratorOrderModal extends PureComponent {
  static defaultProps = {
    submitBtnText: 'Save order',
    initialValues: {
      info: {},
    },
  };

  bodyRenderByModalStep = {
    [steps.ORDER_ITEMS]: this.renderFormingOrderSection,
    [steps.CLIENT_INFO]: this.renderClientInfoSection,
  };

  @autobind
  handleSelectDishForAddingToOrder({ value: dishId }) {
    const { onOpenOrderItemCreationModal } = this.props;

    onOpenOrderItemCreationModal(dishId);
  }

  @autobind
  handleRemoveOrderItem(item) {
    const { onRemoveItemFromCheckout } = this.props;

    onRemoveItemFromCheckout(item.uuid);
  }

  @autobind
  handleSetStep(e, step) {
    const { onSetRestauratorOrderModal } = this.props;

    onSetRestauratorOrderModal({ step });
  }

  @autobind
  renderFormingOrderSection() {
    const { restaurantId, onOpenOrderItemForEditing, products } = this.props;

    return (
      <Grid container spacing={16} direction="column">
        <Grid item>
          <DishAutocomplete
            restaurant_id={restaurantId}
            placeholder="Search by dish name to add a dish"
            onChange={this.handleSelectDishForAddingToOrder}
          />
        </Grid>

        <Grid item>
          <Typography variant="title" paragraph>
            Order items:
          </Typography>

          <Grid container spacing={32} direction="column">
            {products &&
              products.map(product => (
                <Grid item key={product.id || product.uuid}>
                  <ReviewOrderItem
                    item={product}
                    handleEditOrderItemClick={onOpenOrderItemForEditing}
                    handleRemoveOrderItemClick={this.handleRemoveOrderItem}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    );
  }

  @autobind
  renderClientInfoSection() {
    const { orderInfo } = this.props;

    return <ClientInfoForm initialValues={orderInfo} />;
  }

  @autobind
  renderTitle() {
    const { titleText, orderPrice, classes, modalStep } = this.props;

    return (
      <DialogTitle>
        <Grid container justify="space-between" alignItems="center">
          <Typography variant="title">{titleText}</Typography>
          <Typography variant="title">
            ${CurrencyService.show(orderPrice.total)}
          </Typography>
        </Grid>
        <Tabs
          value={modalStep}
          className={classes.restaurantOrderTabs}
          onChange={this.handleSetStep}>
          <Tab className={classes.restaurantOrderTab} label="Product items" />
          <Tab className={classes.restaurantOrderTab} label="Client info" />
        </Tabs>
        <Divider />
      </DialogTitle>
    );
  }

  render() {
    const {
      open,
      classes,
      modalStep,
      isSubmitDisabled,
      onCloseRestauratorOrderModal,
      onAddItemToOrder,
      onFormSubmit,
    } = this.props;

    return (
      <Drawer
        open={open}
        anchor="right"
        onClose={onCloseRestauratorOrderModal}
        PaperProps={{
          classes: {
            root: classes.restaurantOrderDrawerBody,
          },
        }}>
        {this.renderTitle()}
        <DialogContent>{this.bodyRenderByModalStep[modalStep]()}</DialogContent>
        <Divider />
        <DialogActions classes={{ root: classes.dialogActions }}>
          <Button
            disabled={isSubmitDisabled}
            variant="contained"
            color="primary"
            onClick={onFormSubmit}>
            Save
          </Button>
        </DialogActions>

        <DishOrderEditingModal />
        <DishOrderCreationModal
          submitBtnText="Add to order"
          onFormSubmit={onAddItemToOrder}
        />
      </Drawer>
    );
  }
}

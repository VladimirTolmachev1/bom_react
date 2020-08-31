import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { bindActionCreators } from 'redux';

import { authRestaurantIdSelector } from '../../modules/core';
import { orderShape } from '../../constants/propTypes';
import { FullScreenPreloader } from '../../components';
import {
  getRestaurantById,
  managedRestaurantSelector,
} from '../../modules/restaurants';

import {
  OrdersPageHeader,
  InboxOrdersTab,
  ProcessingOrdersTab,
  ClientInfoModal,
} from './components';

import {
  RestauratorOrderEditingModal,
  RestauratorOrderCreationModal,
} from '../modals/restaurator-order';

import {
  setRestauratorOrderModal,
  openRestauratorOrderEditingModal,
  openRestauratorOrderCreationModal,
} from '../../modules/modals/restaurator-order';

import {
  getOrdersTotalInfo,
  setUpdatedOrderInStore,
  getOrders,
  updateOrder,
  completeOrder,
  ordersTotalInfoSelector,
  isOrdersListLoadingSelector,
  ordersByDeliveryMethodsAndStatusesSelector,
} from '../../modules/orders';

import {
  orderStatuses,
  newPaymentMethodByOld,
  orderDeliveryMethods,
} from '../../constants';

const ordersByStatusesShape = Object.values(orderStatuses).reduce(
  (shape, status) => ({
    ...shape,
    [status]: PropTypes.arrayOf(PropTypes.shape(orderShape)),
  }),
  {},
);

const { PICKUP, DELIVERY } = orderDeliveryMethods;
const { NEW, IN_PROCESS, IN_DELIVERY, READY, COMPLETE, REFUND } = orderStatuses;

const CLIENT_MODAL = 'CLIENT_MODAL';

const ORDER_MODAL_INITIAL_STATE = {
  name: '',
  order: {},
  isEditing: false,
};

const mapStateToProps = state => ({
  isLoading: isOrdersListLoadingSelector(state),
  authRestaurantId: authRestaurantIdSelector(state),
  ordersTotalInfo: ordersTotalInfoSelector(state),
  ordersByDeliveryAndStatuses: ordersByDeliveryMethodsAndStatusesSelector(
    state,
  ),
  restaurant: managedRestaurantSelector(state),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { authRestaurantId } = stateProps;

  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,

    actions: {
      getRestaurantOrders: () =>
        dispatch(getOrders({ params: { restaurant_id: authRestaurantId } })),
      getOrdersTotalInfo: () => dispatch(getOrdersTotalInfo(authRestaurantId)),
      getAuthRestaurant: () =>
        dispatch(getRestaurantById({ id: authRestaurantId })),

      ...bindActionCreators(
        {
          updateOrder,
          setUpdatedOrderInStore,
          completeOrder,

          setRestauratorOrderModal,
          openRestauratorOrderEditingModal,
          openRestauratorOrderCreationModal,
        },
        dispatch,
      ),
    },
  };
};

@connect(
  mapStateToProps,
  null,
  mergeProps,
)
class RestaurantOrders extends Component {
  static propTypes = {
    authRestaurantId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,

    actions: PropTypes.shape({
      getRestaurantOrders: PropTypes.func.isRequired,
      updateOrder: PropTypes.func.isRequired,
      getOrdersTotalInfo: PropTypes.func.isRequired,
      setUpdatedOrderInStore: PropTypes.func.isRequired,
    }).isRequired,

    ordersByDeliveryAndStatuses: PropTypes.shape({
      [PICKUP]: PropTypes.shape(ordersByStatusesShape),
      [DELIVERY]: PropTypes.shape(ordersByStatusesShape),
    }),
  };

  static defaultProps = {
    ordersByDeliveryAndStatuses: {
      [PICKUP]: {},
      [DELIVERY]: {},
    },
  };

  componentDidMount() {
    const { actions } = this.props;
    actions.getOrdersTotalInfo();
    actions.getRestaurantOrders();
    actions.getAuthRestaurant();
  }

  state = {
    currentTab: 0,
    orderModal: ORDER_MODAL_INITIAL_STATE,
  };

  openClientModal = (order, modalProps = {}) =>
    this.setState({
      orderModal: {
        name: CLIENT_MODAL,
        open: true,
        order,
        ...modalProps,
      },
    });

  toggleEditingModal = () =>
    this.setState({
      orderModal: {
        ...this.state.orderModal,
        isEditing: !this.state.orderModal.isEditing,
      },
    });

  closeModal = () =>
    this.setState({
      orderModal: {
        ...this.state.orderModal,
        open: false,
      },
    });

  @autobind
  handleEditOrderClick(order) {
    const { actions } = this.props;

    actions.openRestauratorOrderEditingModal({
      orderId: order.id,
    });
  }

  @autobind
  async handleClientInfoSubmit(orderClientInfo) {
    const { actions } = this.props;
    await actions.updateOrder(orderClientInfo).promise;
    this.closeModal();
  }

  createOrderStatusSetter = (
    newStatus,
    setInStoreImmidiatly = false,
  ) => order => {
    const { actions } = this.props;

    const updatedOrder = {
      id: order.id,
      status: newStatus,
    };

    setInStoreImmidiatly && actions.setUpdatedOrderInStore(updatedOrder);
    actions.updateOrder(updatedOrder);
  };

  handleDropToPickupNew = order => {
    const { actions } = this.props;

    const updatedOrder = {
      id: order.id,
      delivery_method: orderDeliveryMethods.PICKUP,
      payment_method: newPaymentMethodByOld[order.payment_method],
    };

    actions.setUpdatedOrderInStore(updatedOrder);
    actions.updateOrder(updatedOrder);
  };

  handleDropToDeliveryNew = order => {
    const { actions } = this.props;

    this.openClientModal(order, {
      isEditing: true,
      hideOrderDetails: true,
      showAdrressDetails: true,
      canToggleEdit: false,
      closeBtnText: 'Cancel',
      submitBtnText: 'Confirm',
      title: 'Confirm client details for changing delivery method',
      onSubmit: async clientInfo => {
        const updatedOrder = {
          ...clientInfo,
          delivery_method: orderDeliveryMethods.DELIVERY,
          payment_method: newPaymentMethodByOld[order.payment_method],
        };
        try {
          await actions.updateOrder(updatedOrder).promise;
          actions.setUpdatedOrderInStore({ ...order, ...updatedOrder });
          this.closeModal();
        } catch (e) {
          console.error(e);
        }
      },
    });
  };

  tabRenderByCurrentTab = {
    0: this.renderInboxOrderTab,
    1: this.renderProcessingOrdersTab,
    2: this.renderCompletedOrdersTab,
  };

  @autobind
  renderInboxOrderTab() {
    const { ordersByDeliveryAndStatuses } = this.props;

    return (
      <InboxOrdersTab
        pickupOrders={ordersByDeliveryAndStatuses[PICKUP][NEW]}
        deliveryOrders={ordersByDeliveryAndStatuses[DELIVERY][NEW]}
        openClientModal={this.openClientModal}
        createOrderStatusSetter={this.createOrderStatusSetter}
        handleDropToDeliveryNew={this.handleDropToDeliveryNew}
        handleDropToPickupNew={this.handleDropToPickupNew}
        handleEditOrderClick={this.handleEditOrderClick}
      />
    );
  }

  @autobind
  renderProcessingOrdersTab() {
    const { ordersByDeliveryAndStatuses, actions } = this.props;

    const deliveryProcessingOrders = [
      ...ordersByDeliveryAndStatuses[DELIVERY][READY],
      ...ordersByDeliveryAndStatuses[DELIVERY][IN_DELIVERY],
    ];

    return (
      <ProcessingOrdersTab
        pickupOrders={ordersByDeliveryAndStatuses[PICKUP][IN_PROCESS]}
        deliveryOrders={ordersByDeliveryAndStatuses[DELIVERY][IN_PROCESS]}
        readyForPickupOrders={ordersByDeliveryAndStatuses[PICKUP][READY]}
        deliveryProcessingOrders={deliveryProcessingOrders}
        createOrderStatusSetter={this.createOrderStatusSetter}
        handleCompleteOrder={actions.completeOrder}
        handleEditOrderClick={this.handleEditOrderClick}
      />
    );
  }

  getNewOrdersAmount() {
    const { ordersByDeliveryAndStatuses: orders } = this.props;

    return orders[PICKUP][NEW].length + orders[DELIVERY][NEW].length;
  }

  getProcessingOrdersAmount() {
    const { ordersByDeliveryAndStatuses: orders } = this.props;

    return (
      orders[PICKUP][IN_PROCESS].length +
      orders[PICKUP][READY].length +
      orders[DELIVERY][READY].length +
      orders[DELIVERY][IN_PROCESS].length +
      orders[DELIVERY][IN_DELIVERY].length
    );
  }

  getCompletedOrdersAmount() {
    const { ordersByDeliveryAndStatuses: orders } = this.props;

    return (
      orders[PICKUP][COMPLETE].length +
      orders[PICKUP][REFUND].length +
      orders[DELIVERY][COMPLETE].length +
      orders[DELIVERY][REFUND].length
    );
  }

  @autobind
  renderCompletedOrdersTab() {
    return null;
  }

  @autobind
  handleTabChange(e, value) {
    this.setState({ currentTab: value });
  }

  render() {
    const { currentTab, orderModal } = this.state;
    const {
      isLoading,
      ordersTotalInfo,
      restaurant: { delivery_method },
      actions: { openRestauratorOrderCreationModal },
    } = this.props;

    const { name: modalName, open, ...orderModalProps } = orderModal;

    return (
      <div className="app-static-container">
        <RestauratorOrderCreationModal />
        <RestauratorOrderEditingModal />

        <OrdersPageHeader
          currentTab={currentTab}
          handleTabChange={this.handleTabChange}
          newOrdersAmount={this.getNewOrdersAmount()}
          processingOrdersAmount={this.getProcessingOrdersAmount()}
          completedOrdersAmount={this.getCompletedOrdersAmount()}
          totalOrdersCompleted={ordersTotalInfo.ordersCompleted}
          totalRevenue={ordersTotalInfo.revenue}
          onNewOrderClick={openRestauratorOrderCreationModal}
        />

        {this.tabRenderByCurrentTab[currentTab]()}

        {isLoading && <FullScreenPreloader />}

        <ClientInfoModal
          open={modalName === CLIENT_MODAL && open}
          onSubmit={this.handleClientInfoSubmit}
          onClose={this.closeModal}
          toggleEditing={this.toggleEditingModal}
          restaurantDeliveryMethod={delivery_method}
          {...orderModalProps}
        />
      </div>
    );
  }
}

export default RestaurantOrders;

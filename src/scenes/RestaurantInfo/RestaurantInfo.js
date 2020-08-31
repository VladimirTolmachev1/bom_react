import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { autobind } from 'core-decorators';
import { withStyles } from '@material-ui/core';

import styles from './styles';
import { authRestaurantIdSelector } from './modules';
import { SetRestaurantHoursModal } from '../SetRestaurantHoursModal';
import { toggleSetRestaurantHoursModal } from '../SetRestaurantHoursModal/modules';

import {
  RestaurantInfoHeader,
  PaymentInfoForm,
  RestaurantInfoForm,
  BillingInfoForm,
} from './components';

import {
  getRestaurantById,
  updateRestaurant,
  managedRestaurantSelector,
  isRestaurantsLoadingSelector,
} from '../../modules/restaurants';

const mapStateToProps = state => ({
  restaurantId: authRestaurantIdSelector(state),
  restaurant: managedRestaurantSelector(state),
  isRestaurantLoading: isRestaurantsLoadingSelector(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      updateRestaurant,
      getRestaurantById,
      toggleSetRestaurantHoursModal,
    },
    dispatch,
  ),
});

@withStyles(styles)
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class RestaurantInfo extends Component {
  state = {
    currentTab: 0,
  };

  tabRenderByCurrentTab = {
    0: this.renderMainInfoForm,
    1: this.renderBillingInfoForm,
    2: this.renderPaymentInfoForm,
  };

  @autobind
  handleUpdateRestaurant(fields) {
    const { actions, restaurantId } = this.props;
    actions.updateRestaurant({ body: { ...fields, id: restaurantId } });
  }

  @autobind
  openRestaurantsHorsModal() {
    const { actions, restaurantId } = this.props;
    actions.toggleSetRestaurantHoursModal({ id: restaurantId, open: true });
  }

  @autobind
  renderMainInfoForm() {
    return (
      <RestaurantInfoForm
        openRestaurantsHorsModal={this.openRestaurantsHorsModal}
        onSubmit={this.handleUpdateRestaurant}
        isLoading={this.props.isRestaurantLoading}
      />
    );
  }

  @autobind
  // eslint-disable-next-line class-methods-use-this
  renderBillingInfoForm() {
    return <BillingInfoForm />;
  }

  @autobind
  renderPaymentInfoForm() {
    return (
      <PaymentInfoForm
        isConnectedToStripe={this.props.restaurant.connected_stripe}
      />
    );
  }

  componentDidMount() {
    const { actions, restaurantId } = this.props;
    actions.getRestaurantById({ id: restaurantId });
  }

  @autobind
  handleTabChange(e, value) {
    this.setState({ currentTab: value });
  }

  render() {
    const { currentTab } = this.state;
    const { classes } = this.props;
    return (
      <div className="app-static-container">
        <RestaurantInfoHeader
          currentTab={currentTab}
          handleTabChange={this.handleTabChange}
        />

        <div className={classes.formWrapper}>
          {this.tabRenderByCurrentTab[currentTab]()}
        </div>

        <SetRestaurantHoursModal />
      </div>
    );
  }
}

export default RestaurantInfo;

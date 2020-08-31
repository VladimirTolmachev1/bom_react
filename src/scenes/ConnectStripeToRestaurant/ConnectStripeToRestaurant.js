import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid } from '@material-ui/core';

import { queryParamsFromPropsSelector } from '../../selectors/common';
import { authRestaurantIdSelector } from '../RestaurantInfo/modules';
import { FullScreenPreloader } from '../../components';
import {
  connectStripeToResourant,
  isStripeConnectingSelector,
  setStripeConnectionErrorMessage,
  stripeConnectionErrorSelector,
} from './modules';

const mapStateToProps = (state, ownProps) => ({
  queryParams: queryParamsFromPropsSelector(ownProps),
  errorMessage: stripeConnectionErrorSelector(state),
  restaurantId: authRestaurantIdSelector(state),
  isLoading: isStripeConnectingSelector(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      connectStripeToResourant,
    },
    dispatch,
  ),
});

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class ConnectStripeToRestaurant extends Component {
  componentDidMount() {
    const { queryParams, restaurantId, actions } = this.props;
    if (queryParams.code) {
      actions.connectStripeToResourant({
        body: {
          code: queryParams.code,
          restaurant_id: Number(restaurantId),
        },
      });
    }

    if (queryParams.error) {
      setStripeConnectionErrorMessage(queryParams.error_description);
    }
  }

  componentWillUpdate() {
    const { history, isLoading, errorMessage } = this.props;

    if (!isLoading && !errorMessage) {
      history.push('/restaurant_info');
    }
  }

  render() {
    const { isLoading, errorMessage } = this.props;

    return (
      <Grid
        justify="center"
        alignItems="center"
        className="app-static-container">
        {isLoading && (
          <FullScreenPreloader>
            <p> Connecting to Stripe </p>
          </FullScreenPreloader>
        )}

        {errorMessage && <p> {errorMessage}</p>}
      </Grid>
    );
  }
}

ConnectStripeToRestaurant.propTypes = {
  queryParams: PropTypes.object,
  errorMessage: PropTypes.string,
  restaurantId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isLoading: PropTypes.bool,
  actions: PropTypes.object.isRequired,
};

export default ConnectStripeToRestaurant;

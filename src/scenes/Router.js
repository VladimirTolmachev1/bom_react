import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Switch, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import './Router.scss';

import {
  isAuthSelector,
  signOut,
  getDictionaries,
  roleSelector,
  themeSelector,
  themeColorSelector,
  bgColorSelector,
} from '../modules/core';
import { PrivateRoute } from '../components';

import { SignIn } from './SignIn';
import { ForgotPassword } from './ForgotPassword';
import { ResetPassword } from './ResetPassword';
import { Header } from './Header';

import { Restaurants } from './Restaurants';
import { MenuRestorator, MenuClient } from './Menu';

import { Designer } from './Designer';
import { Checkout } from './Checkout';

import { Footer } from './Footer';
import { Toasts } from './Toasts';
import { AppConfirm } from './AppConfirm';
import { RestaurantInfo } from './RestaurantInfo';
import { ConnectStripeToRestaurant } from './ConnectStripeToRestaurant';
import { RestaurantOrders } from './RestaurantOrders';

import { CustomDragLayer } from './RestaurantOrders/components';

const mapDispatchToProps = {
  signOut,
  getDictionaries,
};

const mapStateToProps = state => ({
  isAuth: isAuthSelector(state),
  role: roleSelector(state),
  theme: themeSelector(state),
  themeColor: themeColorSelector(state),
  bgColor: bgColorSelector(state),
});

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class Router extends PureComponent {
  componentDidMount() {
    const { isAuth, getDictionaries } = this.props;
    isAuth && getDictionaries();
  }

  render() {
    const { isAuth, signOut, role, theme, themeColor, bgColor } = this.props;

    const mainStyle = {
      backgroundColor: bgColor,
    };

    return (
      <MuiThemeProvider theme={createMuiTheme(theme)}>
        <>
          <CustomDragLayer />

          <Header isAuth={isAuth} signOut={signOut} role={role} />
          <Toasts />
          <AppConfirm />
          <main className="app-container__main" style={mainStyle}>
            <Switch>
              <PrivateRoute
                path="/sign-in"
                hasAccess={!isAuth}
                role={role}
                component={SignIn}
              />
              <PrivateRoute
                path="/forgot-password"
                role={role}
                hasAccess={!isAuth}
                component={ForgotPassword}
              />
              <PrivateRoute
                path="/password/reset/:token"
                role={role}
                hasAccess={!isAuth}
                component={ResetPassword}
              />
              <PrivateRoute
                path="/restaurants"
                role={role}
                hasAccess={isAuth && role.name === 'admin'}
                component={Restaurants}
              />
              <PrivateRoute
                path="/menu"
                role={role}
                hasAccess={isAuth}
                component={MenuRestorator}
              />
              <PrivateRoute
                path="/r/:restaurant_url"
                role={role}
                hasAccess
                component={MenuClient}
              />
              <PrivateRoute
                path="/r/:restaurant_url/:category_name"
                role={role}
                hasAccess
                component={MenuClient}
              />
              <PrivateRoute
                path="/designer"
                role={role}
                hasAccess={isAuth}
                component={Designer}
              />

              <PrivateRoute
                path="/checkout/:restaurant_url"
                role={role}
                hasAccess
                component={Checkout}
              />

              <PrivateRoute
                path="/restaurant_info"
                role={role}
                hasAccess={isAuth && role.name === 'restaurant'}
                component={RestaurantInfo}
              />

              <PrivateRoute
                path="/restaurant/connect_to_stripe"
                role={role}
                hasAccess={isAuth && role.name === 'restaurant'}
                component={ConnectStripeToRestaurant}
              />

              <PrivateRoute
                path="/restaurant_orders"
                role={role}
                hasAccess={isAuth && role.name === 'restaurant'}
                component={RestaurantOrders}
              />

              {/* todo fix this bug */}
              <Redirect to="/restaurants" />
            </Switch>
          </main>
          <Footer color={themeColor} />
        </>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(Router);

Router.propTypes = {
  signOut: PropTypes.func,
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import { withRouter } from 'react-router-dom';
import { UnauthorizedNav, AdminNav, ClientNav } from './components';

import './Header.scss';

export default
@withRouter
class Header extends Component {
  renderNav() {
    const {
      history: {
        location: { pathname },
      },
      isAuth,
      signOut,
      role,
    } = this.props;

    const isCheckoutPage = pathname.includes('/checkout');

    if (pathname.includes('/r/') || isCheckoutPage) {
      return <ClientNav isCheckoutPage={isCheckoutPage} />;
    }

    return isAuth ? (
      <AdminNav signOut={signOut} role={role} />
    ) : (
      <UnauthorizedNav />
    );
  }

  render() {
    return (
      <AppBar
        position="static"
        color="primary"
        className="app-container-fluid app-header">
        <div className="app-static-container app-header__container">
          <div className="app-header__brand">Best Online Menus</div>
          {this.renderNav()}
        </div>
      </AppBar>
    );
  }
}

Header.propTypes = {
  signOut: PropTypes.func.isRequired,
};

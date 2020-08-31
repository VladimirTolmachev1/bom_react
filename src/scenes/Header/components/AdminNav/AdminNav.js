/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { autobind } from 'core-decorators';

export class AdminNav extends PureComponent {
  @autobind
  onSignOutClick() {
    const { signOut } = this.props;
    signOut();
  }

  getMarkupByRole() {
    const { role } = this.props;

    switch (role.name) {
      case 'restaurant': {
        return (
          <Fragment>
            <NavLink
              to="/restaurant_info"
              activeClassName="active"
              className="header-nav__list-item">
              Restaurant info
            </NavLink>
            <NavLink
              to={`/menu?restaurant_id=${role.restaurant_id}`}
              activeClassName="active"
              className="header-nav__list-item">
              Menu
            </NavLink>
            <NavLink
              to={`/designer?restaurant_id=${role.restaurant_id}`}
              activeClassName="active"
              className="header-nav__list-item">
              Page Designer
            </NavLink>

            <NavLink
              to="/restaurant_orders"
              activeClassName="active"
              className="header-nav__list-item">
              Orders
            </NavLink>
          </Fragment>
        );
      }
      case 'admin': {
        return (
          <li>
            <NavLink
              to="/restaurants"
              activeClassName="active"
              className="header-nav__list-item">
              Restaurants
            </NavLink>
          </li>
        );
      }
      default: {
        return false;
      }
    }
  }

  render() {
    return (
      <nav className="header-nav">
        <ul className="header-nav__list">
          {this.getMarkupByRole()}
          <li>
            <a
              href="#"
              className="header-nav__list-item"
              onClick={this.onSignOutClick}>
              Sign Out
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

AdminNav.propTypes = {
  signOut: PropTypes.func.isRequired,
};
AdminNav.defaultProps = {};

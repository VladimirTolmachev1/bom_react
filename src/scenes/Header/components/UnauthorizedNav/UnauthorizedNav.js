import React from 'react';
import { NavLink } from 'react-router-dom';

export function UnauthorizedNav() {
  return (
    <nav className="header-nav">
      <ul className="header-nav__list">
        <NavLink
          to="/sign-in"
          activeClassName="active"
          className="header-nav__list-item">
          Sign in
        </NavLink>
      </ul>
    </nav>
  );
}

UnauthorizedNav.propTypes = {};
UnauthorizedNav.defaultProps = {};

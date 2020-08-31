import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function redirectTo({ role, path }) {
  let redirect = '/sign-in';

  if (['/sign-in', '/forgot-password'].includes(path)) {
    redirect =
      role.name === 'admin'
        ? '/restaurant'
        : `/menu?restaurant_id=${role.restaurant_id}`;
  }

  return redirect;
}

export const PrivateRoute = ({
  component: Component,
  hasAccess,
  role,
  path,
  ...rest
}) => (
  <Route
    path={path}
    {...rest}
    render={props =>
      hasAccess === true ? (
        <Component {...props} />
      ) : (
        <Redirect to={redirectTo({ role, path })} />
      )
    }
  />
);

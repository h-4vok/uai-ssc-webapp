import React, { PureComponent } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Authorizer } from '../../lib/Authorizer';

export class ProtectedRoute extends PureComponent {
  render() {
    const { component: Component, ...props } = this.props;
    const isAuthorized =
      Authorizer.isLoggedIn() &&
      (Authorizer.has(props.permission) ||
        Authorizer.hasAll(...props.hasAllPermissions) ||
        Authorizer.hasOne(...props.hasOnePermissions));

    return (
      <Route
        exact
        {...props}
        render={componentProps =>
          isAuthorized ? <Component {...componentProps} /> : <Redirect to="/" />
        }
      />
    );
  }
}

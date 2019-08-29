import React, { PureComponent } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Authorizer } from '../../../lib/SscAuthorize';

export class ProtectedRoute extends PureComponent {
  render() {
    const { component: Component, ...props } = this.props;

    return (
      <Route
        {...props}
        render={componentProps =>
          Authorizer.isLoggedIn() ? (
            <Component {...componentProps} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
    );
  }
}

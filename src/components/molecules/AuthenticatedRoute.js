import React, { PureComponent } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Authorizer } from '../../lib/Authorizer';

export class AuthenticatedRoute extends PureComponent {
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

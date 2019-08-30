import React, { PureComponent } from 'react';
import { Route } from 'react-router-dom';

export class UnprotectedRoute extends PureComponent {
  render() {
    const { component: Component, ...props } = this.props;

    return (
      <Route
        {...props}
        render={componentProps => <Component {...componentProps} />}
      />
    );
  }
}

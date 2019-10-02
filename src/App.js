import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import * as Pages from './components/pages';
import './App.scss';
import {
  UnprotectedRoute,
  AuthenticatedRoute,
  ProtectedRoute,
  NoMatchRoute
} from './components/molecules';
import {
  unprotectedRoutes,
  authenticatedRoutes,
  protectedRoutes
} from './App.content';

export const App = () => (
  <Router>
    <div>
      <Switch>
        <UnprotectedRoute exact path="/" component={Pages.MarketingHome} />
        {unprotectedRoutes.map(route => (
          <UnprotectedRoute path={route.path} component={route.component} />
        ))}

        {authenticatedRoutes.map(route => (
          <AuthenticatedRoute path={route.path} component={route.component} />
        ))}

        {protectedRoutes.map(route => (
          <ProtectedRoute
            path={route.path}
            component={route.component}
            permission={route.permission}
          />
        ))}

        <Route component={NoMatchRoute} />
      </Switch>
    </div>
  </Router>
);

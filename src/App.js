import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import * as Pages from './components/pages';
import './App.scss';
import { UnprotectedRoute, NoMatchRoute } from './components/molecules';

export const App = () => (
  <Router>
    <div>
      <Switch>
        <UnprotectedRoute exact path="/" component={Pages.MarketingHome} />
        <UnprotectedRoute path="/pricing" component={Pages.PricingPage} />
        <UnprotectedRoute path="/ssc" component={Pages.DefaultPage} />
        <UnprotectedRoute path="/about" component={Pages.DefaultPage} />
        <UnprotectedRoute
          path="/sign-up--initial"
          component={Pages.SignUpInitialPage}
        />
        <UnprotectedRoute path="/sign-in" component={Pages.SignInPage} />
        <UnprotectedRoute
          path="/forgot-password"
          component={Pages.DefaultPage}
        />
        <Route component={NoMatchRoute} />
      </Switch>
    </div>
  </Router>
);

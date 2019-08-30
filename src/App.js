import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { DefaultPage, MarketingHome } from './components/pages';
import './App.scss';
import { UnprotectedRoute, NoMatchRoute } from './components/molecules';

export const App = () => (
  <Router>
    <div>
      <Switch>
        <UnprotectedRoute exact path="/" component={MarketingHome} />
        <UnprotectedRoute path="/pricing" component={DefaultPage} />
        <UnprotectedRoute path="/ssc" component={DefaultPage} />
        <UnprotectedRoute path="/about" component={DefaultPage} />
        <UnprotectedRoute path="/signup" component={DefaultPage} />
        <Route component={NoMatchRoute} />
      </Switch>
    </div>
  </Router>
);

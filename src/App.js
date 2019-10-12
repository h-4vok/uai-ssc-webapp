import React, { PureComponent } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
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
import { GlobalState } from './lib/GlobalState';

let siteFontSize = 12;

const buildTheme = () =>
  createMuiTheme({
    typography: {
      fontSize: siteFontSize
    }
  });

export class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      appTheme: buildTheme()
    };

    GlobalState.AppComponent = this;
  }

  increaseFontSize = () => {
    if (siteFontSize >= 40) return;

    siteFontSize++;
    this.setState({ appTheme: buildTheme() });
  };

  decreaseFontSize = () => {
    if (siteFontSize <= 6) return;

    siteFontSize--;
    this.setState({ appTheme: buildTheme() });
  };

  render() {
    const { appTheme } = this.state;

    return (
      <Router>
        <ThemeProvider theme={appTheme}>
          <div>
            <Switch>
              <UnprotectedRoute
                exact
                path="/"
                component={Pages.MarketingHome}
              />
              {unprotectedRoutes.map(route => (
                <UnprotectedRoute
                  path={route.path}
                  component={route.component}
                />
              ))}

              {authenticatedRoutes.map(route => (
                <AuthenticatedRoute
                  path={route.path}
                  component={route.component}
                />
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
        </ThemeProvider>
      </Router>
    );
  }
}

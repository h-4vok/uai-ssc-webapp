import React, { PureComponent } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
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
import { defaultDictionary } from './App.defaultDictionary';
import { GlobalState } from './lib/GlobalState';
import LocalizationContext from './localization/LocalizationContext';

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
      appTheme: buildTheme(),
      i10n: defaultDictionary
    };

    GlobalState.AppComponent = this;
  }

  switchLanguage = dictionary => {
    console.log(dictionary);
    this.setState({ i10n: dictionary || defaultDictionary });
  };

  switchLanguageTest = () => {
    const newDictionary = {
      'app.home.slogan':
        '[SUCCESS] La solución integral para la administración de muestras de tu laboratorio.',
      'app.marketing.menu.about-us': '[SUCCESS]  Sobre Nosotros',
      'app.marketing.menu.platform': '[SUCCESS] Ingresar',
      'app.marketing.menu.pricing': '[SUCCESS] Precios',
      'app.title': '[SUCCESS] SAMPLE SUPPLY CHAIN'
    };

    this.setState({ i10n: newDictionary });
  };

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
    const { appTheme, i10n } = this.state;

    return (
      <Router>
        <div>
          <LocalizationContext.Provider value={i10n}>
            <CssBaseline />
            <ThemeProvider theme={appTheme}>
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
            </ThemeProvider>
          </LocalizationContext.Provider>
        </div>
      </Router>
    );
  }
}

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
import { MenuStorage } from './securedMenu/MenuStorage';
import LocalizationContext from './localization/LocalizationContext';
import SecuredMenuContext from './securedMenu/SecuredMenuContext';
import ChatMessagingContext from './lib/ChatMessagingContext';

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
      i10n: defaultDictionary,
      securedMenu: null,
      chatConversation: { Messages: [] }
    };

    GlobalState.AppComponent = this;
  }

  componentDidMount() {
    if (this.state.securedMenu === null) {
      MenuStorage.tryRefresh();
    }
  }

  updateChatConversation = (chatConversation, callback) =>
    this.setState({ chatConversation }, callback);

  switchLanguage = dictionary => {
    this.setState({ i10n: dictionary || defaultDictionary });
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

  refreshSecuredMenu = securedMenu => this.setState({ securedMenu });

  render() {
    const { appTheme, i10n, securedMenu, chatConversation } = this.state;

    return (
      <Router>
        <div>
          <LocalizationContext.Provider value={i10n}>
            <SecuredMenuContext.Provider value={securedMenu}>
              <ChatMessagingContext.Provider value={chatConversation}>
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
              </ChatMessagingContext.Provider>
            </SecuredMenuContext.Provider>
          </LocalizationContext.Provider>
        </div>
      </Router>
    );
  }
}

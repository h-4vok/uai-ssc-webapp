import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { withSnackbar } from 'notistack';
import { RouteLink, EnglishLanguageIcon, SpanishLanguageIcon } from '../atoms';
import './ApplicationBar.styles.scss';
import { Authorizer } from '../../lib/Authorizer';
import { API } from '../../lib/xhr';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { GlobalState } from '../../lib/GlobalState';
import withLocalization from '../../localization/withLocalization';
import withSecuredMenu from '../../securedMenu/withSecuredMenu';
import { ChatDrawer } from './ChatDrawer';
import { ChatBarToggler } from './ChatBarToggler';
import { AdminChatNotifier } from './AdminChatNotifier';

const defaultState = {
  anchorEl: null,
  accountMenuOpen: false,
  chatOpen: false
};

class PlatformBarComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = defaultState;
    this.openVariableNames = [];

    // Create the variable state variables for dynamic menus
    if (this.props.securedMenu) {
      this.props.securedMenu.forEach(({ Code }) => {
        const openVariableName = `${Code}-open`;
        this.openVariableNames.push(openVariableName);
      });

      this.state = {
        ...this.state,
        ...this.openVariableNames.map(name => ({ [name]: false }))
      };
    }

    this.notifier = new SnackbarVisitor(props);
    this.api = new API(this.notifier);
  }

  setDefaultState = () => {
    const newState = {
      ...defaultState
    };

    this.openVariableNames.forEach(name => (newState[name] = false));

    this.setState(newState);
  };

  changeLanguageTo = languageCode => {
    this.api.request
      .getById('systemLanguage', languageCode)
      .preventDefaultError()
      .preventDefaultFailure()
      .preventDefaultSuccess()
      .success(res => {
        const entries = res.body.Result;
        const dictionary = {};

        entries.forEach(
          ({ Key, Translation }) => (dictionary[Key] = Translation)
        );

        GlobalState.AppComponent.switchLanguage(dictionary);
      })
      .go();
  };

  handleMenuClick = (event, menuOpenVariableName) => {
    this.setState({
      anchorEl: event.currentTarget,
      [menuOpenVariableName]: true
    });
  };

  handleClose = () => {
    this.setDefaultState();
  };

  goTo = route => {
    this.handleClose();
    if (GlobalState.History) {
      GlobalState.History.push(route);
    } else {
      window.location.href = `http://${window.location.hostname}:${window.location.port}/#${route}`;
    }
  };

  buildButton = (ariaControl, label, menuOpenVariableName, ...permissions) => {
    if (Authorizer.hasOne(...permissions)) {
      return (
        <Button
          aria-controls={ariaControl}
          aria-haspopup="true"
          onClick={event => this.handleMenuClick(event, menuOpenVariableName)}
          className="menu-button"
        >
          {label}
        </Button>
      );
    }

    return null;
  };

  buildMenuItem = (route, label, ...permissions) => {
    if ((permissions && Authorizer.hasOne(...permissions)) || !permissions) {
      return <MenuItem onClick={() => this.goTo(route)}>{label}</MenuItem>;
    }

    return null;
  };

  closeSession() {
    this.api.request
      .del('authentication', 0)
      .preventDefaultSuccess()
      .preventDefaultError()
      .success(() => {
        GlobalState.Authorizer.clearAuthorizations();
        GlobalState.UserSessionService.setUserId(null);

        if (GlobalState.History) {
          GlobalState.History.push('/sign-in');
        } else {
          window.location.href = `http://${window.location.hostname}:${window.location.port}/#/sign-in`;
        }
      })
      .error(() => {
        GlobalState.Authorizer.clearAuthorizations();

        if (GlobalState.History) {
          GlobalState.History.push('/sign-in');
        } else {
          window.location.href = `http://${window.location.hostname}:${window.location.port}/#/sign-in`;
        }
      })
      .go();
  }

  renderMenu = data => {
    if (!data) return null;

    const output = [];

    data.forEach(menu => {
      const openVariableName = `${menu.Code}-open`;
      this.openVariableNames.push(openVariableName);

      const menuButton = this.buildButton(
        menu.Code,
        this.props.i10n[menu.TranslationKey],
        openVariableName
      );

      output.push(menuButton);

      const menuComponent = (
        <Menu
          id={menu.Code}
          anchorEl={this.state.anchorEl}
          keepMounted
          open={this.state[openVariableName]}
          onClose={this.handleClose}
        >
          {menu.Items.map(menuItem =>
            this.buildMenuItem(
              menuItem.RelativeRoute,
              this.props.i10n[menuItem.TranslationKey]
            )
          )}
        </Menu>
      );

      output.push(menuComponent);
    });

    return output;
  };

  toggleChatOpen = chatOpen => this.setState({ chatOpen });

  render() {
    const { anchorEl, accountMenuOpen, chatOpen } = this.state;
    const { i10n, securedMenu } = this.props;

    return (
      <>
        {!GlobalState.Authorizer.has('PLATFORM_ADMIN') && (
          <ChatDrawer
            chatOpen={chatOpen}
            toggleChatOpen={this.toggleChatOpen}
            onChatReply={this.onChatReply}
          />
        )}
        <div className="application-bar">
          <AppBar position="fixed">
            <Toolbar>
              {!GlobalState.Authorizer.has('PLATFORM_ADMIN') && (
                <ChatBarToggler toggleChatOpen={this.toggleChatOpen} />
              )}
              {GlobalState.Authorizer.has('PLATFORM_ADMIN') && (
                <AdminChatNotifier
                  onClick={() =>
                    this.props.history.push('/support/chat-conversation')
                  }
                />
              )}
              <IconButton
                edge="start"
                className="application-bar-menu-button"
                color="inherit"
                aria-label="menu"
                onClick={() => this.goTo('/platform-search')}
              >
                <Search />
              </IconButton>
              <Typography variant="h6" className="application-bar-title">
                <Button size="large">
                  <RouteLink link="platform-home">
                    {i10n['app.title']}
                  </RouteLink>
                </Button>
              </Typography>

              <Button onClick={() => this.changeLanguageTo(2)}>
                <EnglishLanguageIcon />
              </Button>
              <Button onClick={() => this.changeLanguageTo(1)}>
                <SpanishLanguageIcon />
              </Button>

              <Button
                onClick={() => GlobalState.AppComponent.decreaseFontSize()}
              >
                -A
              </Button>
              <Button
                onClick={() => GlobalState.AppComponent.increaseFontSize()}
              >
                +A
              </Button>

              {this.renderMenu(securedMenu)}

              {this.buildButton(
                'work-order-menu',
                i10n['menu.platform.account-menu'],
                'accountMenuOpen'
              )}

              <Menu
                id="account-menu"
                anchorEl={anchorEl}
                keepMounted
                open={accountMenuOpen}
                onClose={this.handleClose}
              >
                <MenuItem onClick={() => this.closeSession()}>
                  {i10n['menu.platform.sign-out']}
                </MenuItem>
                {this.buildMenuItem(
                  '/account/change-password',
                  i10n['menu.platform.account.change-password']
                )}
                {/* {this.buildMenuItem(
                  '/platform/support-ticket',
                  i10n['menu.platform.management.tickets'],
                  'MEMBER_MANAGEMENT',
                  'MEMBER_REPORT',
                  'PATIENTS_MANAGEMENT',
                  'PAYMENT_METHOD_MANAGEMENT',
                  'RUN_EXECUTION_CANCEL',
                  'RUN_EXECUTION_PRIMARY',
                  'RUN_EXECUTION_QA',
                  'RUN_EXECUTION_QC',
                  'SAMPLE_FUNCTION_MANAGEMENT',
                  'SAMPLE_FUNCTION_REPORT',
                  'SAMPLE_MANAGEMENT',
                  'SAMPLE_TYPE_MANAGEMENT',
                  'SAMPLE_TYPE_REPORT',
                  'USERS_INVITE',
                  'WORK_ORDER_CREATE',
                  'WORK_ORDER_EXECUTE',
                  'WORK_ORDER_REPORT'
                )} */}
                {this.buildMenuItem(
                  '/account/leave-comment',
                  i10n['menu.platform.account.leave-comment'],
                  'MEMBER_MANAGEMENT',
                  'MEMBER_REPORT',
                  'PATIENTS_MANAGEMENT',
                  'PAYMENT_METHOD_MANAGEMENT',
                  'RUN_EXECUTION_CANCEL',
                  'RUN_EXECUTION_PRIMARY',
                  'RUN_EXECUTION_QA',
                  'RUN_EXECUTION_QC',
                  'SAMPLE_FUNCTION_MANAGEMENT',
                  'SAMPLE_FUNCTION_REPORT',
                  'SAMPLE_MANAGEMENT',
                  'SAMPLE_TYPE_MANAGEMENT',
                  'SAMPLE_TYPE_REPORT',
                  'USERS_INVITE',
                  'WORK_ORDER_CREATE',
                  'WORK_ORDER_EXECUTE',
                  'WORK_ORDER_REPORT'
                )}
                {this.buildMenuItem(
                  '/client-landing',
                  i10n['menu.platform.account.my-service-status'],
                  'MEMBER_MANAGEMENT',
                  'MEMBER_REPORT',
                  'PATIENTS_MANAGEMENT',
                  'PAYMENT_METHOD_MANAGEMENT',
                  'RUN_EXECUTION_CANCEL',
                  'RUN_EXECUTION_PRIMARY',
                  'RUN_EXECUTION_QA',
                  'RUN_EXECUTION_QC',
                  'SAMPLE_FUNCTION_MANAGEMENT',
                  'SAMPLE_FUNCTION_REPORT',
                  'SAMPLE_MANAGEMENT',
                  'SAMPLE_TYPE_MANAGEMENT',
                  'SAMPLE_TYPE_REPORT',
                  'USERS_INVITE',
                  'WORK_ORDER_CREATE',
                  'WORK_ORDER_EXECUTE',
                  'WORK_ORDER_REPORT'
                )}
              </Menu>
            </Toolbar>
          </AppBar>
        </div>
      </>
    );
  }
}

export const PlatformBar = withRouter(
  withLocalization(withSecuredMenu(withSnackbar(PlatformBarComponent)))
);

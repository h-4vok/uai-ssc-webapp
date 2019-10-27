import React, { PureComponent } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { RouteLink, EnglishLanguageIcon, SpanishLanguageIcon } from '../atoms';
import './ApplicationBar.styles.scss';
import { Authorizer } from '../../lib/Authorizer';
import { API } from '../../lib/xhr';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { GlobalState } from '../../lib/GlobalState';
import withLocalization from '../../localization/withLocalization';

const defaultState = {
  anchorEl: null,
  configurationMenuOpen: false,
  securityMenuOpen: false,
  inventoryMenuOpen: false,
  clientMenuOpen: false,
  workOrderMenuOpen: false
};

class PlatformBarComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = defaultState;

    this.notifier = new SnackbarVisitor(props);
    this.api = new API(this.notifier);
  }

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
    this.setState(defaultState);
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
      .success(() => {
        GlobalState.Authorizer.clearAuthorizations();

        if (GlobalState.History) {
          GlobalState.History.push('sign-in');
        } else {
          window.location.href = `http://${window.location.hostname}:${window.location.port}/#/sign-in`;
        }
      })
      .go();
  }

  render() {
    const {
      anchorEl,
      configurationMenuOpen,
      securityMenuOpen,
      inventoryMenuOpen,
      clientMenuOpen,
      workOrderMenuOpen
    } = this.state;

    const { i10n } = this.props;

    return (
      <div className="application-bar">
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              edge="start"
              className="application-bar-menu-button"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className="application-bar-title">
              <Button size="large">
                <RouteLink link="">{i10n['app.title']}</RouteLink>
              </Button>
            </Typography>

            <Button onClick={() => this.changeLanguageTo(2)}>
              <EnglishLanguageIcon />
            </Button>
            <Button onClick={() => this.changeLanguageTo(1)}>
              <SpanishLanguageIcon />
            </Button>

            <Button onClick={() => GlobalState.AppComponent.decreaseFontSize()}>
              -A
            </Button>
            <Button onClick={() => GlobalState.AppComponent.increaseFontSize()}>
              +A
            </Button>

            {this.buildButton(
              'configuration-menu',
              i10n['menu.platform.configuration-menu'],
              'configurationMenuOpen',
              'UNIT_OF_MEASURE_MANAGEMENT',
              'SAMPLE_TYPE_MANAGEMENT',
              'SAMPLE_TYPE_REPORT',
              'SAMPLE_TYPE_PARAMETERS_MANAGEMENT',
              'SAMPLE_FUNCTION_REPORT',
              'SAMPLE_FUNCTION_MANAGEMENT',
              'LANGUAGES_MANAGEMENT',
              'CLIENT_MANAGEMENT',
              'CLIENT_BILLING_MANAGEMENT'
            )}

            <Menu
              id="configuration-menu"
              anchorEl={anchorEl}
              keepMounted
              open={configurationMenuOpen}
              onClose={this.handleClose}
            >
              {this.buildMenuItem(
                '/configuration/unit-of-measure',
                i10n['menu.platform.configuration.unit-of-measure'],
                'UNIT_OF_MEASURE_MANAGEMENT',
                'UNIT_OF_MEASURE_MANAGEMENT'
              )}
              {this.buildMenuItem(
                '/configuration/sample-type',
                i10n['menu.platform.configuration.sample-type'],
                'SAMPLE_TYPE_MANAGEMENT',
                'SAMPLE_TYPE_REPORT'
              )}
              {this.buildMenuItem(
                '/configuration/sample-type-parameter',
                i10n['menu.platform.configuration.sample-type-parameter'],
                'SAMPLE_TYPE_PARAMETERS_MANAGEMENT'
              )}
              {this.buildMenuItem(
                '/configuration/sample-function',
                i10n['menu.platform.configuration.sample-function'],
                'SAMPLE_FUNCTION_REPORT',
                'SAMPLE_FUNCTION_MANAGEMENT'
              )}
              {this.buildMenuItem(
                '/configuration/language',
                i10n['menu.platform.configuration.language'],
                'LANGUAGES_MANAGEMENT'
              )}
              {this.buildMenuItem(
                '/configuration/client-billing',
                i10n['menu.platform.configuration.clients-and-billing'],
                'CLIENT_MANAGEMENT'
              )}
            </Menu>

            {this.buildButton(
              'security-menu',
              i10n['menu.platform.security-menu'],
              'securityMenuOpen',
              'USERS_MANAGEMENT',
              'USERS_REPORT',
              'ROLES_MANAGEMENT',
              'ROLES_REPORT',
              'PLATFORM_ADMIN',
              'PLATFORM_BACKUP',
              'PLATFORM_ADMIN'
            )}

            <Menu
              id="security-menu"
              anchorEl={anchorEl}
              keepMounted
              open={securityMenuOpen}
              onClose={this.handleClose}
            >
              {this.buildMenuItem(
                '/security/user',
                i10n['menu.platform.security.user'],
                'USERS_MANAGEMENT',
                'USERS_REPORT'
              )}
              {this.buildMenuItem(
                '/security/role',
                i10n['menu.platform.security.role'],
                'ROLES_MANAGEMENT',
                'ROLES_REPORT'
              )}
              {this.buildMenuItem(
                '/security/log',
                i10n['menu.platform.security.logging'],
                'PLATFORM_ADMIN'
              )}
              {this.buildMenuItem(
                '/security/backup',
                i10n['menu.platform.security.backup'],
                'PLATFORM_BACKUP'
              )}
              {this.buildMenuItem(
                '/security/parameter',
                i10n['menu.platform.security.parameters'],
                'PLATFORM_ADMIN'
              )}
            </Menu>

            {this.buildButton(
              'inventory-menu',
              i10n['menu.platform.inventory-menu'],
              'inventoryMenuOpen',
              'PATIENT_MANAGEMENT',
              'SAMPLE_MANAGEMENT'
            )}

            <Menu
              id="inventory-menu"
              anchorEl={anchorEl}
              keepMounted
              open={inventoryMenuOpen}
              onClose={this.handleClose}
            >
              {this.buildMenuItem(
                '/inventory/patient',
                i10n['menu.platform.inventory.patient'],
                'PATIENT_MANAGEMENT'
              )}
              {this.buildMenuItem(
                '/inventory/sample',
                i10n['menu.platform.inventory.sample'],
                'SAMPLE_MANAGEMENT'
              )}
            </Menu>

            {this.buildButton(
              'management-menu',
              i10n['menu.platform.management-menu'],
              'clientMenuOpen',
              'MEMBER_MANAGEMENT',
              'MEMBER_REPORT',
              'PAYMENT_METHOD_MANAGEMENT',
              'CLIENT_BILLING_MANAGEMENT'
            )}

            <Menu
              id="management-menu"
              anchorEl={anchorEl}
              keepMounted
              open={clientMenuOpen}
              onClose={this.handleClose}
            >
              {this.buildMenuItem(
                '/management/member',
                i10n['menu.platform.management.members'],
                'MEMBER_MANAGEMENT',
                'MEMBER_REPORT'
              )}
              {this.buildMenuItem(
                '/management/payment-type',
                i10n['menu.platform.management.payment-type'],
                'PAYMENT_METHOD_MANAGEMENT'
              )}
              {this.buildMenuItem(
                '/management/billing',
                i10n['menu.platform.management.billing'],
                'CLIENT_BILLING_MANAGEMENT'
              )}
            </Menu>

            {this.buildButton(
              'work-order-menu',
              i10n['menu.platform.work-order-menu'],
              'workOrderMenuOpen',
              'WORK_ORDER_CREATE',
              'WORK_ORDER_EXECUTE',
              'WORK_ORDER_REPORT',
              'RUN_EXECUTION_CANCEL',
              'RUN_EXECUTION_PRIMARY',
              'RUN_EXECUTION_QA',
              'RUN_EXECUTION_QC'
            )}

            <Menu
              id="work-order-menu"
              anchorEl={anchorEl}
              keepMounted
              open={workOrderMenuOpen}
              onClose={this.handleClose}
            >
              {this.buildMenuItem(
                '/work-order/work-order',
                i10n['menu.platform.work-order.batches'],
                'WORK_ORDER_CREATE',
                'WORK_ORDER_EXECUTE',
                'WORK_ORDER_REPORT'
              )}
              {this.buildMenuItem(
                '/work-order/run',
                i10n['menu.platform.work-order.runs'],
                'RUN_EXECUTION_CANCEL',
                'RUN_EXECUTION_PRIMARY',
                'RUN_EXECUTION_QA',
                'RUN_EXECUTION_QC'
              )}
            </Menu>
            <Button onClick={() => this.closeSession()} className="menu-button">
              {i10n['menu.platform.sign-out']}
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export const PlatformBar = withLocalization(withSnackbar(PlatformBarComponent));

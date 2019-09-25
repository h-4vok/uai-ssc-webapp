import React, { PureComponent } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, Typography, Button } from '@material-ui/core';
import { RouteLink } from '../atoms/RouteLink';
import './ApplicationBar.styles.scss';

const defaultState = {
  anchorEl: null,
  configurationMenuOpen: false,
  securityMenuOpen: false,
  inventoryMenuOpen: false,
  clientMenuOpen: false,
  workOrderMenuOpen: false
};

export class PlatformBar extends PureComponent {
  constructor(props) {
    super(props);

    this.state = defaultState;
  }

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
    this.props.history.push(route);
  };

  buildButton = (ariaControl, label, menuOpenVariableName) => (
    <Button
      aria-controls={ariaControl}
      aria-haspopup="true"
      onClick={event => this.handleMenuClick(event, menuOpenVariableName)}
      className="menu-button"
    >
      {label}
    </Button>
  );

  buildMenuItem = (route, label) => (
    <MenuItem onClick={() => this.goTo(route)}>{label}</MenuItem>
  );

  render() {
    const {
      anchorEl,
      configurationMenuOpen,
      securityMenuOpen,
      inventoryMenuOpen,
      clientMenuOpen,
      workOrderMenuOpen
    } = this.state;

    return (
      <div className="application-bar">
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" className="application-bar-title">
              <Button size="large">
                <RouteLink link="">Sample Supply Chain</RouteLink>
              </Button>
            </Typography>

            {this.buildButton(
              'configuration-menu',
              'Configuración',
              'configurationMenuOpen'
            )}

            <Menu
              id="configuration-menu"
              anchorEl={anchorEl}
              keepMounted
              open={configurationMenuOpen}
              onClose={this.handleClose}
            >
              {this.buildMenuItem(
                '/platform/configuration/sample-type',
                'Tipos de Muestra'
              )}
              {this.buildMenuItem(
                '/platform/configuration/sample-type-parameter',
                'Parámetros de Tipos de Muestra'
              )}
              {this.buildMenuItem(
                '/platform/configuration/sample-function',
                'Funciones de Muestra'
              )}
              {this.buildMenuItem(
                '/platform/configuration/language',
                'Idiomas'
              )}
              {this.buildMenuItem(
                '/platform/configuration/client-billing',
                'Clientes y Facturación'
              )}
            </Menu>

            {this.buildButton('security-menu', 'Seguridad', 'securityMenuOpen')}

            <Menu
              id="security-menu"
              anchorEl={anchorEl}
              keepMounted
              open={securityMenuOpen}
              onClose={this.handleClose}
            >
              {this.buildMenuItem('/platform/security/user', 'Usuarios')}
              {this.buildMenuItem('/platform/security/role', 'Roles')}
              {this.buildMenuItem('/platform/security/log', 'Bitácora')}
              {this.buildMenuItem('/platform/security/backup', 'Resguardos')}
              {this.buildMenuItem(
                '/platform/security/parameter',
                'Parametrización'
              )}
            </Menu>

            {this.buildButton(
              'inventory-menu',
              'Inventariado',
              'inventoryMenuOpen'
            )}

            <Menu
              id="inventory-menu"
              anchorEl={anchorEl}
              keepMounted
              open={inventoryMenuOpen}
              onClose={this.handleClose}
            >
              {this.buildMenuItem('/platform/inventory/patient', 'Pacientes')}
              {this.buildMenuItem('/platform/inventory/sample', 'Muestras')}
            </Menu>

            {this.buildButton(
              'management-menu',
              'Auto-Gestión',
              'clientMenuOpen'
            )}

            <Menu
              id="management-menu"
              anchorEl={anchorEl}
              keepMounted
              open={clientMenuOpen}
              onClose={this.handleClose}
            >
              {this.buildMenuItem('/platform/management/member', 'Miembros')}
              {this.buildMenuItem(
                '/platform/management/payment-type',
                'Forma de Pago'
              )}
              {this.buildMenuItem(
                '/platform/management/billing',
                'Facturación'
              )}
            </Menu>

            {this.buildButton(
              'work-order-menu',
              'Órdenes de Trabajo',
              'workOrderMenuOpen'
            )}

            <Menu
              id="work-order-menu"
              anchorEl={anchorEl}
              keepMounted
              open={workOrderMenuOpen}
              onClose={this.handleClose}
            >
              {this.buildMenuItem(
                '/platform/work-order/work-order',
                'Lotes de Ejecución'
              )}
              {this.buildMenuItem(
                '/platform/work-order/run',
                'Ejecuciones de Ensayo'
              )}
            </Menu>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

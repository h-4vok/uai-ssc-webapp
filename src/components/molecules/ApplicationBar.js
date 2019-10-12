import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import LanguageIcon from '@material-ui/icons/Language';
import { RouteLink, EnglishLanguageIcon, SpanishLanguageIcon } from '../atoms';
import './ApplicationBar.styles.scss';
import { GlobalState } from '../../lib/GlobalState';
import { LocalizationService } from '../../lib/LocalizationService';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';

class ApplicationBarComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(props);
    this.api = new API(this.notifier);

    this.state = {
      languageMenuOpen: false,
      anchorEl: null
    };
  }

  handleClose = () => {
    this.setState({
      anchorEl: null,
      languageMenuOpen: false
    });
  };

  handleMenuClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
      languageMenuOpen: true
    });
  };

  changeLanguageTo = languageCode => {
    this.api.request
      .getById('systemLanguage', languageCode)
      .preventDefaultError()
      .preventDefaultFailure()
      .preventDefaultSuccess()
      .success(res => {
        LocalizationService.switchDictionary(res.body.Result);
      })
      .go();

    this.handleClose();
  };

  render() {
    const { languageMenuOpen, anchorEl } = this.state;

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
                <RouteLink link="">Sample Supply Chain</RouteLink>
              </Button>
            </Typography>

            <Button onClick={() => GlobalState.AppComponent.decreaseFontSize()}>
              <EnglishLanguageIcon />
            </Button>
            <Button onClick={() => GlobalState.AppComponent.decreaseFontSize()}>
              <SpanishLanguageIcon />
            </Button>

            <Button onClick={() => GlobalState.AppComponent.decreaseFontSize()}>
              -A
            </Button>
            <Button onClick={() => GlobalState.AppComponent.increaseFontSize()}>
              +A
            </Button>
            <Button>
              <RouteLink link="pricing">Precios</RouteLink>
            </Button>
            <Button>
              <RouteLink link="about">Sobre Nosotros</RouteLink>
            </Button>
            <Button variant="outlined">
              <RouteLink link="sign-in">Ingresar</RouteLink>
            </Button>
            <Button
              aria-controls="language-menu"
              aria-haspopup="true"
              onClick={event => this.handleMenuClick(event)}
              className="menu-button"
            >
              <LanguageIcon />
            </Button>

            <Menu
              id="language-menu"
              anchorEl={anchorEl}
              keepMounted
              open={languageMenuOpen}
              onClose={this.handleClose}
            >
              <MenuItem onClick={() => this.changeLanguageTo('es')}>
                Español
              </MenuItem>
              <MenuItem onClick={() => this.changeLanguageTo('en')}>
                English
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export const ApplicationBar = withSnackbar(ApplicationBarComponent);

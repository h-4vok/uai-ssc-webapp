import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { RouteLink, EnglishLanguageIcon, SpanishLanguageIcon } from '../atoms';
import './ApplicationBar.styles.scss';
import withLocalization from '../../localization/withLocalization';
import { GlobalState } from '../../lib/GlobalState';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';

class ApplicationBarComponent extends PureComponent {
  constructor(props) {
    super(props);

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

  render() {
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
                <RouteLink link="">
                  {i10n['app.title'] || 'SAMPLE SUPPLY CHAIN'}
                </RouteLink>
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
            <Button>
              <RouteLink link="pricing">
                {i10n['app.marketing.menu.pricing'] || 'Precios'}
              </RouteLink>
            </Button>
            <Button>
              <RouteLink link="service-catalog">
                {i10n['app.marketing.menu.catalog'] || 'Servicios'}
              </RouteLink>
            </Button>
            <Button>
              <RouteLink link="about">
                {i10n['app.marketing.menu.about-us'] || 'Sobre Nosotros'}
              </RouteLink>
            </Button>
            <Button>
              <RouteLink link="contact-us">
                {i10n['app.marketing.menu.contact-us']}
              </RouteLink>
            </Button>
            <Button>
              <RouteLink link="privacy-policy">
                {i10n['app.marketing.menu.privacy-policy']}
              </RouteLink>
            </Button>
            <Button>
              <RouteLink link="tos">{i10n['app.marketing.menu.tos']}</RouteLink>
            </Button>
            <Button variant="outlined">
              <RouteLink link="sign-in">
                {i10n['app.marketing.menu.platform'] || 'Ingresar'}
              </RouteLink>
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export const ApplicationBar = withLocalization(
  withSnackbar(ApplicationBarComponent)
);

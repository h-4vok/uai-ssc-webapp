import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { RouteLink } from '../atoms/RouteLink';
import './ApplicationBar.styles.scss';

export const ApplicationBar = () => (
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

        <Button>
          <RouteLink link="pricing">Precios</RouteLink>
        </Button>
        <Button>
          <RouteLink link="about">Sobre Nosotros</RouteLink>
        </Button>
        <Button variant="outlined">
          <RouteLink link="ssc">Plataforma</RouteLink>
        </Button>
      </Toolbar>
    </AppBar>
  </div>
);

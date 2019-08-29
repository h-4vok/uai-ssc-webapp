import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { RouteLink } from '../RouteLink/RouteLink';
import './styles.scss';

export const ApplicationBar = () => (
  <div className="application-bar">
    <AppBar position="static">
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
          Sample Supply Chain
        </Typography>

        <Button color="inherit">
          <RouteLink link="pricing">Precios</RouteLink>
        </Button>
        <Button color="inherit">
          <RouteLink link="about">Sobre Nosotros</RouteLink>
        </Button>
        <Button color="inherit">
          <RouteLink link="ssc">Plataforma</RouteLink>
        </Button>
      </Toolbar>
    </AppBar>
  </div>
);

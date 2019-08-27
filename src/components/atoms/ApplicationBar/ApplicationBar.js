import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
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

        <Button color="inherit">Precios</Button>
        <Button color="inherit">Sobre Nosotros</Button>
        <Button color="inherit">Plataforma</Button>
      </Toolbar>
    </AppBar>
  </div>
);

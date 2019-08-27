import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar } from '@material-ui/core';
import './styles.scss';
import { PlatformLogo } from '../PlatformLogo/PlatformLogo';

export const Footer = () => (
  <div className="footer">
    <AppBar className="footer-appbar">
      <Toolbar className="footer-toolbar">
        <PlatformLogo edge="start" />
        <span edge="end" className="trademark-text">
          © 2019 Havok International SRL. All rights reserved.
        </span>
      </Toolbar>
    </AppBar>
  </div>
);

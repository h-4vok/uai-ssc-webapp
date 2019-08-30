import React from 'react';
import { Image } from './Image';
import logo from '../../images/logo.png';
import './PlatformLogo.styles.scss';

export const PlatformLogo = () => <Image src={logo} className="logo" />;

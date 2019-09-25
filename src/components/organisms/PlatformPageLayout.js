import React from 'react';
import PropTypes from 'prop-types';
import { PlatformBar } from '../molecules';
import './PageLayout.styles.scss';

export const PlatformPageLayout = props => (
  <div className="page-layout-container">
    <PlatformBar history={props.history} />

    <div className="page-layout-children-container">{props.children}</div>
  </div>
);

PlatformPageLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired
};

import React from 'react';
import PropTypes from 'prop-types';
import { ApplicationBar, Footer } from '../../atoms';
import './styles.scss';

export const PageLayout = props => (
  <div className="page-layout-container">
    <ApplicationBar />

    <div className="page-layout-children-container">{props.children}</div>

    <Footer />
  </div>
);

PageLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired
};

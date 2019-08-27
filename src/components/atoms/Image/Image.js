import React from 'react';
import PropTypes from 'prop-types';

export const Image = props => (
  <img
    src={props.src}
    className={props.className}
    alt={props.alt}
    onClick={props.onClick}
    role="presentation"
  />
);

Image.defaultProps = {
  alt: '',
  className: '',
  onClick: null
};

Image.propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  src: PropTypes.string.isRequired
};

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import './RouteLink.scss';

export class RouteLink extends PureComponent {
  render() {
    const { dark, blue, link, to, ...props } = this.props;
    let { className } = this.props;

    const linkObject =
      link !== null && link !== undefined ? { pathname: `/${link}` } : to;

    if (dark) {
      className = `dark ${className}`;
    } else if (blue) {
      className = `blue ${className}`;
    }

    return (
      <Link
        className={`route-link ${className}`}
        props={{ ...props }}
        to={linkObject}
      >
        {this.props.children}
      </Link>
    );
  }
}

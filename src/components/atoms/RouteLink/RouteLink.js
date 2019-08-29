import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

export class RouteLink extends PureComponent {
  render() {
    const { link, to, ...props } = this.props;
    const linkObject = link ? { pathname: `/${link}` } : to;

    return (
      <Link props={{ ...props }} to={linkObject}>
        {this.props.children}
      </Link>
    );
  }
}

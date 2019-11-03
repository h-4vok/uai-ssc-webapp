import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import SecuredMenuContext from './SecuredMenuContext';

const withSecuredMenu = Component => {
  const WrappedComponent = React.forwardRef((props, ref) => (
    <SecuredMenuContext.Consumer>
      {context => <Component {...props} ref={ref} securedMenu={context} />}
    </SecuredMenuContext.Consumer>
  ));

  hoistNonReactStatics(WrappedComponent, Component);

  return WrappedComponent;
};

export default withSecuredMenu;

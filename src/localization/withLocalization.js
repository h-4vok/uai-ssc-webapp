import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import LocalizationContext from './LocalizationContext';

const withLocalization = Component => {
  const WrappedComponent = React.forwardRef((props, ref) => (
    <LocalizationContext.Consumer>
      {context => <Component {...props} ref={ref} i10n={context} />}
    </LocalizationContext.Consumer>
  ));

  hoistNonReactStatics(WrappedComponent, Component);

  return WrappedComponent;
};

export default withLocalization;

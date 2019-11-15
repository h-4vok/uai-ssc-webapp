import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import AdminChatMessagingContext from './AdminChatMessagingContext';

const withAdminChatMessaging = Component => {
  const WrappedComponent = React.forwardRef((props, ref) => (
    <AdminChatMessagingContext.Consumer>
      {context => (
        <Component {...props} ref={ref} adminPendingChatCount={context} />
      )}
    </AdminChatMessagingContext.Consumer>
  ));

  hoistNonReactStatics(WrappedComponent, Component);

  return WrappedComponent;
};

export default withAdminChatMessaging;

import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import ChatMessagingContext from './ChatMessagingContext';

const withChatMessaging = Component => {
  const WrappedComponent = React.forwardRef((props, ref) => (
    <ChatMessagingContext.Consumer>
      {context => <Component {...props} ref={ref} chatConversation={context} />}
    </ChatMessagingContext.Consumer>
  ));

  hoistNonReactStatics(WrappedComponent, Component);

  return WrappedComponent;
};

export default withChatMessaging;

import React from 'react';
import ChatMessagingContext from './ChatMessagingContext';

export default function useChatMessaging() {
  return React.useContext(ChatMessagingContext);
}

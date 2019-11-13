import React, { PureComponent } from 'react';
import { IconButton, Badge } from '@material-ui/core';
import { Chat } from '@material-ui/icons';
import withChatMessaging from '../../lib/withChatMessaging';

class ChatBarTogglerComponent extends PureComponent {
  render() {
    const { chatConversation, toggleChatOpen } = this.props;
    const conversationBadgeCount = chatConversation.Messages.filter(
      x => !x.IsMine && x.Pending
    ).length;

    return (
      <IconButton
        edge="start"
        className="application-bar-menu-button"
        color="inherit"
        aria-label="menu"
        onClick={() => toggleChatOpen(true)}
      >
        <Badge badgeContent={conversationBadgeCount} color="secondary">
          <Chat />
        </Badge>
      </IconButton>
    );
  }
}

export const ChatBarToggler = withChatMessaging(ChatBarTogglerComponent);

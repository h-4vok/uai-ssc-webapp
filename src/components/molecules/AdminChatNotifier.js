import React, { PureComponent } from 'react';
import { IconButton, Badge } from '@material-ui/core';
import { Announcement } from '@material-ui/icons';
import withAdminChatMessaging from '../../lib/withAdminChatMessaging';

class AdminChatNotifierComponent extends PureComponent {
  render() {
    const { adminPendingChatCount, onClick } = this.props;

    return (
      <IconButton
        edge="start"
        className="application-bar-menu-button"
        color="inherit"
        aria-label="menu"
        onClick={onClick}
      >
        <Badge badgeContent={adminPendingChatCount} color="secondary">
          <Announcement />
        </Badge>
      </IconButton>
    );
  }
}

export const AdminChatNotifier = withAdminChatMessaging(
  AdminChatNotifierComponent
);

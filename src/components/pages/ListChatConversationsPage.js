import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';
import { PlatformPageLayout } from '../organisms';
import { ListChatConversationsTemplate } from '../templates';
import withLocalization from '../../localization/withLocalization';

const apiroute = 'platformchat';

class ListChatConversationsPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);

    this.state = {
      items: null
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  onRefresh = () => {
    this.api.request
      .get(apiroute)
      .success(res => this.setState({ items: res.body.Result }))
      .go();
  };

  onReplyAction = id => {
    this.props.history.push(`/support/chat-conversation/${id}/reply`);
  };

  render() {
    const { items } = this.state;

    return (
      <PlatformPageLayout>
        <ListChatConversationsTemplate
          items={items}
          onRefresh={this.onRefresh}
          onReplyAction={this.onReplyAction}
        />
      </PlatformPageLayout>
    );
  }
}

export const ListChatConversationsPage = withLocalization(
  withSnackbar(ListChatConversationsPageComponent)
);

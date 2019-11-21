import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';
import { PlatformPageLayout } from '../organisms';
import { ReplySupportTicketTemplate } from '../templates';

const apiroute = 'platformchat';

class ReplyChatConversationPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.userId = this.props.match.params.id;

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);

    this.state = {
      conversation: null,
      reply: {}
    };
  }

  componentDidMount() {
    this.loadModel();
    this.intervalId = window.setInterval(this.loadModel, 3000);
  }

  componentWillUnmount() {
    window.clearInterval(this.intervalId);
  }

  scrollChatboxDown = () => {
    const chatboxDiv = document.getElementById('chatbox');
    chatboxDiv.scrollTop = chatboxDiv.scrollHeight;
  };

  setConversation = chatMessages => {
    this.setState(
      {
        conversation: { Messages: chatMessages },
        reply: { Content: '' }
      },
      this.scrollChatboxDown
    );
  };

  loadModel = () => {
    this.api.request
      .getById(apiroute, this.userId)
      .preventSpinner()
      .preventDefaultSuccess()
      .preventDefaultError()
      .preventDefaultFailure()
      .success(res => this.setConversation(res.body.Result))
      .go();
  };

  onConfirmReply = callback => {
    const body = { Content: this.state.reply.Content };

    this.api.request
      .put(apiroute, body, this.userId)
      .preventSpinner()
      .preventDefaultSuccess()
      .success(res => this.setConversation(res.body.Result))
      .success(callback)
      .go();
  };

  render() {
    const { conversation, reply } = this.state;

    return (
      <PlatformPageLayout>
        {conversation && (
          <ReplySupportTicketTemplate
            conversation={conversation}
            reply={reply}
            onConfirmReply={this.onConfirmReply}
          />
        )}
      </PlatformPageLayout>
    );
  }
}

export const ReplyChatConversationPage = withSnackbar(
  ReplyChatConversationPageComponent
);

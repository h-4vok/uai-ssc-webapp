import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';
import { PlatformPageLayout } from '../organisms';
import { ReplySupportTicketTemplate } from '../templates';

const apiroute = 'supportticket';

class ReplySupportTicketPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.modelId = this.props.match.params.id;

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);

    this.state = {
      conversation: null,
      reply: {}
    };
  }

  componentDidMount() {
    this.loadModel();
  }

  scrollChatboxDown = () => {
    const chatboxDiv = document.getElementById('chatbox');
    chatboxDiv.scrollTop = chatboxDiv.scrollHeight;
  };

  loadModel = () => {
    this.api.request
      .getById(apiroute, this.modelId)
      .success(res =>
        this.setState(
          { conversation: res.body.Result, reply: { Content: '' } },
          this.scrollChatboxDown
        )
      )
      .go();
  };

  onConfirmReply = () => {
    this.api.request
      .put(
        apiroute,
        { Content: this.state.reply.Content, SupportTicketId: this.modelId },
        0
      )
      .preventDefaultSuccess()
      .success(this.loadModel)
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

export const ReplySupportTicketPage = withSnackbar(
  ReplySupportTicketPageComponent
);

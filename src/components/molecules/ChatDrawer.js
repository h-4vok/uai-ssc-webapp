import React, { PureComponent } from 'react';
import { Drawer, Typography, Container, Box } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';
import { ReplySupportTicketTemplate } from '../templates';
import { GlobalState } from '../../lib/GlobalState';
import withChatMessaging from '../../lib/withChatMessaging';
import withLocalization from '../../localization/withLocalization';

class ChatDrawerComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);

    this.state = { reply: {} };
  }

  componentDidMount() {
    this.api.request
      .getById('platformchat', GlobalState.UserSessionService.getUserId())
      .preventSpinner()
      .preventDefaultSuccess()
      .preventDefaultError()
      .preventDefaultFailure()
      .success(res => this.setConversation(res.body.Result))
      .go();
  }

  setConversation = chatMessages => {
    GlobalState.AppComponent.updateChatConversation(
      { Messages: chatMessages },
      this.scrollChatboxDown
    );
  };

  scrollChatboxDown = () => {
    const chatboxDiv = document.getElementById('chatbox');
    if (chatboxDiv) chatboxDiv.scrollTop = chatboxDiv.scrollHeight;
  };

  onChatReply = () => {
    const body = { Content: this.state.reply.Content };

    this.api.request
      .put('platformchat', body, GlobalState.UserSessionService.getUserId())
      .preventSpinner()
      .preventDefaultSuccess()
      .success(res => {
        this.setConversation(res.body.Result);
      })
      .go();
  };

  render() {
    const { chatOpen, toggleChatOpen, chatConversation, i10n } = this.props;

    const { reply } = this.state;

    return (
      <Drawer
        anchor="left"
        open={chatOpen}
        onClose={() => toggleChatOpen(false)}
      >
        {/* <div style={{ width: 500, padding: 10, paddingTop: 40 }}> */}
        <Container maxWidth="sm">
          <Box ml={3} mr={3} mt={1} mb={1}>
            <Typography>{i10n['chat-drawer.tip']}</Typography>
          </Box>
          <ReplySupportTicketTemplate
            conversation={chatConversation}
            reply={reply}
            onConfirmReply={this.onChatReply}
          />
        </Container>

        {/* </div> */}
      </Drawer>
    );
  }
}

export const ChatDrawer = withLocalization(
  withSnackbar(withChatMessaging(ChatDrawerComponent))
);

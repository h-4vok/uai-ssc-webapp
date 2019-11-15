import React, { PureComponent } from 'react';
import { Container, Button, Box } from '@material-ui/core';
import withLocalization from '../../localization/withLocalization';
import { SimpleTextField } from '../atoms';
import { ChatBox } from '../molecules';

class ReplySupportTicketTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    const { Content } = this.props.reply;

    this.state = { Content };
  }

  onInputChange = evt => {
    this.props.reply[evt.target.name] = evt.target.value;
    this.setState({ [evt.target.name]: evt.target.value });
  };

  cleanAndReply = callback => {
    this.setState({ Content: '' });
    callback();
  };

  render() {
    const {
      i10n,
      conversation,
      onConfirmReply,
      containerMaxWidth = 'md'
    } = this.props;
    const { Content } = this.state;

    return (
      <Container maxWidth={containerMaxWidth}>
        <ChatBox id="chatbox" conversation={conversation} />
        <Box mt={1} mb={1}>
          <SimpleTextField
            required
            maxLength="8000"
            id="Content"
            name="Content"
            variant="outlined"
            label={i10n['support-ticket.model.content']}
            fullWidth
            value={Content}
            onChange={this.onInputChange}
            multiline
            rows="3"
            rowsMax="3"
          />
        </Box>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => this.cleanAndReply(onConfirmReply)}
        >
          {i10n['support-ticket.action.reply']}
        </Button>
      </Container>
    );
  }
}

export const ReplySupportTicketTemplate = withLocalization(
  ReplySupportTicketTemplateComponent
);

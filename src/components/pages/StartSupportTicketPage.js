import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { API } from '../../lib/xhr';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { PlatformPageLayout } from '../organisms';
import { StartSupportTicketTemplate } from '../templates';

const apiroute = 'supportticket';
const fallbackRoute = '/platform/support-ticket';

class StartSupportTicketPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);

    this.state = {
      model: {}
    };
  }

  onConfirm = () => {
    const redirect = () => this.props.history.push(fallbackRoute);
    const { Subject, Content } = this.state.model;

    const body = {
      Status: {
        Code: 'SENT'
      },
      Subject,
      Messages: [
        {
          Content
        }
      ]
    };

    this.api.request
      .post(apiroute, body)
      .success(redirect)
      .go();
  };

  render() {
    const { model } = this.state;

    return (
      <PlatformPageLayout>
        <StartSupportTicketTemplate model={model} onConfirm={this.onConfirm} />
      </PlatformPageLayout>
    );
  }
}

export const StartSupportTicketPage = withSnackbar(
  StartSupportTicketPageComponent
);

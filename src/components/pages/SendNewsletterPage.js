import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { API } from '../../lib/xhr';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { PlatformPageLayout } from '../organisms';
import { SendNewsletterTemplate } from '../templates';

const apiroute = 'newsletter';

class SendNewsletterPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);

    let sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    console.log(sevenDaysAgo);

    this.state = {
      model: {
        DateFrom: sevenDaysAgo,
        DateTo: new Date(),
        IncomingHost: `${window.location.hostname}:${window.location.port}`
      }
    };
  }

  onConfirm = () => {
    this.api.request.post(apiroute, this.state.model).go();
  };

  render() {
    const { model } = this.state;

    return (
      <PlatformPageLayout>
        <SendNewsletterTemplate model={model} onConfirm={this.onConfirm} />
      </PlatformPageLayout>
    );
  }
}

export const SendNewsletterPage = withSnackbar(SendNewsletterPageComponent);

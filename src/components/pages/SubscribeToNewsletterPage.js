import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { API } from '../../lib/xhr';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { PageLayout } from '../organisms';
import { SubscribeToNewsletterTemplate } from '../templates';
import withLocalization from '../../localization/withLocalization';

const apiroute = 'newsletter';

class SubscribeToNewsletterPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);
  }

  onConfirm = Email => {
    this.api.request
      .put(apiroute, { Email }, 0)
      .preventDefaultSuccess()
      .success(() =>
        this.notifier.success(this.props.i10n['subscribe-newsletter.success'])
      )
      .success(() => this.props.history.push('/'))
      .go();
  };

  render() {
    return (
      <PageLayout>
        <SubscribeToNewsletterTemplate onConfirm={this.onConfirm} />
      </PageLayout>
    );
  }
}

export const SubscribeToNewsletterPage = withLocalization(
  withSnackbar(SubscribeToNewsletterPageComponent)
);

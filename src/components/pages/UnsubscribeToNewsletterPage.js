import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { API } from '../../lib/xhr';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { PageLayout } from '../organisms';
import withLocalization from '../../localization/withLocalization';

const apiroute = 'newsletter';

class UnsubscribeToNewsletterPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.token = this.props.match.params.token;

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);
  }

  componentDidMount() {
    const redirect = () => this.props.history.push('/');

    this.api.request
      .put(apiroute, { Email: this.token, IsDelete: true }, 0)
      .preventDefaultSuccess()
      .success(() =>
        this.notifier.success(this.props.i10n['newsletter.unsubscribe.success'])
      )
      .success(redirect)
      .error(redirect)
      .failure(redirect)
      .go();
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
    return <PageLayout />;
  }
}

export const UnsubscribeToNewsletterPage = withLocalization(
  withSnackbar(UnsubscribeToNewsletterPageComponent)
);

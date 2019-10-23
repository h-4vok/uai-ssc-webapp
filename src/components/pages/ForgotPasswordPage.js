import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { PageLayout } from '../organisms';
import { ForgotPasswordTemplate } from '../templates';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';
import { getCurrentHost } from '../../lib/getCurrentHost';
import withLocalization from '../../localization/withLocalization';

class ForgotPasswordPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);
  }

  onConfirm = UserName => {
    this.api.request
      .post('forgotpassword', { UserName, IncomingHost: getCurrentHost() })
      .preventDefaultSuccess()
      .success(() => {
        this.notifier.warning(
          this.props.i10n['forgot-password.submit-message']
        );
        this.props.history.push('/sign-in');
      })
      .go();
  };

  render() {
    return (
      <PageLayout>
        <ForgotPasswordTemplate onConfirm={this.onConfirm} />
      </PageLayout>
    );
  }
}

export const ForgotPasswordPage = withLocalization(
  withSnackbar(ForgotPasswordPageComponent)
);

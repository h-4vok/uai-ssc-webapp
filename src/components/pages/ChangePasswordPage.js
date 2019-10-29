import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { PlatformPageLayout } from '../organisms';
import { ChangePasswordTemplate } from '../templates';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';
import withLocalization from '../../localization/withLocalization';

class ChangePasswordPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);
    this.model = {
      currentPassword: '',
      password1: '',
      password2: '',
      IncomingHost: `${window.location.hostname}:${window.location.port}`
    };
  }

  onConfirm = () => {
    this.api.request
      .post('changepassword', this.model)
      .preventDefaultSuccess()
      .success(() => {
        this.notifier.success(this.props.i10n['change-password.success']);
        this.props.history.push('/sign-in');
      })
      .go();
  };

  render() {
    return (
      <PlatformPageLayout>
        <ChangePasswordTemplate model={this.model} onConfirm={this.onConfirm} />
      </PlatformPageLayout>
    );
  }
}

export const ChangePasswordPage = withLocalization(
  withSnackbar(ChangePasswordPageComponent)
);

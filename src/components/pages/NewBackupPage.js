import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { API } from '../../lib/xhr';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { PlatformPageLayout } from '../organisms';
import { NewBackupTemplate } from '../templates';
import withLocalization from '../../localization/withLocalization';

const apiroute = 'backup';

class NewBackupPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);

    this.state = {
      model: { FilePath: 'C:\\tmp\\SSC.bkp' }
    };
  }

  onConfirm = () => {
    this.api.request
      .post(apiroute, this.state.model)
      .preventDefaultSuccess()
      .success(() => {
        this.notifier.success(this.props.i10n['backup.backup-success']);
        this.props.history.push('/security/backup');
      })
      .go();
  };

  render() {
    const { model } = this.state;

    return (
      <PlatformPageLayout>
        <NewBackupTemplate onConfirm={this.onConfirm} model={model} />
      </PlatformPageLayout>
    );
  }
}

export const NewBackupPage = withLocalization(
  withSnackbar(NewBackupPageComponent)
);

import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { API } from '../../lib/xhr';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { PlatformPageLayout } from '../organisms';
import { NewBackupFSTemplate } from '../templates';
import withLocalization from '../../localization/withLocalization';

const apiroute = 'backup';

class NewBackupFSPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);

    this.state = {
      model: { FilePath: '', IsPathOnly: true }
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
        <NewBackupFSTemplate onConfirm={this.onConfirm} model={model} />
      </PlatformPageLayout>
    );
  }
}

export const NewBackupFSPage = withLocalization(
  withSnackbar(NewBackupFSPageComponent)
);

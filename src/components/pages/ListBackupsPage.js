import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { PlatformPageLayout } from '../organisms';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';
import { ConfirmDialog } from '../molecules';
import { ListBackupsTemplate } from '../templates';
import withLocalization from '../../localization/withLocalization';

const apiRoute = 'backup';

class ListBackupsPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(props);
    this.api = new API(this.notifier);

    this.state = {
      items: [],
      dataGridApi: null,
      dialogOpen: false
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  onRefresh() {
    this.api.request
      .get(apiRoute)
      .success(res => {
        this.setState({
          items: res.body.Result
        });
      })
      .go();
  }

  onBackupConfirm = () => {
    this.api.request
      .post(apiRoute, {})
      .preventDefaultSuccess()
      .success(() => {
        this.notifier.success(this.props.i10n['backup.backup-success']);
        this.onRefresh();
      })
      .go();
  };

  onRestoreConfirm = id => {
    this.api.request
      .put(apiRoute, {}, id)
      .preventDefaultSuccess()
      .success(() => {
        this.notifier.success(this.props.i10n['backup.restore-success']);
        this.state.dataGridApi.deselectAll();
        this.onRefresh();
      })
      .go();
  };

  onBackupAction() {
    this.setState({
      dialogOpen: true,
      dialogAfterAction: () => this.onBackupConfirm()
    });
  }

  onRestoreAction(id, dataGridApi) {
    this.setState({
      dialogOpen: true,
      dialogAfterAction: () => this.onRestoreConfirm(id),
      dataGridApi
    });
  }

  onConfirmDialog = () => {
    this.state.dialogAfterAction();
    this.setState({ dialogOpen: false });
  };

  render() {
    const { items, dialogOpen } = this.state;

    return (
      <PlatformPageLayout>
        <ListBackupsTemplate
          items={items}
          onRefresh={() => this.onRefresh()}
          onBackupAction={() => this.onBackupAction()}
          onRestoreAction={(id, gridApi) => this.onRestoreAction(id, gridApi)}
        />
        <ConfirmDialog
          open={dialogOpen}
          onConfirm={() => this.onConfirmDialog()}
          onClose={() => this.setState({ dialogOpen: false })}
        />
      </PlatformPageLayout>
    );
  }
}
export const ListBackupsPage = withLocalization(
  withSnackbar(ListBackupsPageComponent)
);

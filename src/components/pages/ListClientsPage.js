import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { PlatformPageLayout } from '../organisms';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';
import { ConfirmDialog } from '../molecules';
import { ListClientsTemplate } from '../templates';

const apiRoute = 'clientcompany';

class ListClientsPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(props);
    this.api = new API(this.notifier);

    this.state = {
      items: [],
      dialogOpen: false,
      dialogAfterAction: null,
      dataGridApi: null
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  onRefresh = () => {
    this.api.request
      .get(apiRoute)
      .success(res => {
        this.setState({
          items: res.body.Result
        });
      })
      .go();
  };

  onViewAccountStatus = id => {
    this.props.history.push(`/configuration/client-billing/status/${id}`);
  };

  onViewTransactions = id => {
    this.props.history.push(`/configuration/client-billing/transactions/${id}`);
  };

  onEnableAction = (selectedItems, dataGridApi) => {
    this.setState({
      dialogOpen: true,
      dialogAfterAction: () => this.onEnableConfirm(selectedItems),
      dataGridApi
    });
  };

  onDisableAction = (selectedItems, dataGridApi) => {
    this.setState({
      dialogOpen: true,
      dialogAfterAction: () => this.onDisableConfirm(selectedItems),
      dataGridApi
    });
  };

  doPatchIsEnabled = (items, value) => {
    const operations = items.map(item => ({
      key: item.Id,
      op: 'replace',
      field: 'IsEnabled',
      value
    }));

    const body = {
      Operations: operations
    };

    this.api.request
      .patch(apiRoute, body, 0)
      .success(() => {
        this.state.dataGridApi.deselectAll();
        this.onRefresh();
      })
      .go();
  };

  onEnableConfirm = items => this.doPatchIsEnabled(items, true);

  onDisableConfirm = items => this.doPatchIsEnabled(items, false);

  onConfirmDialog = () => {
    this.state.dialogAfterAction();
    this.setState({ dialogOpen: false });
  };

  render() {
    const { items, dialogOpen } = this.state;

    return (
      <PlatformPageLayout>
        <ListClientsTemplate
          items={items}
          onRefresh={this.onRefresh}
          onViewAccountStatus={this.onViewAccountStatus}
          onViewTransactions={this.onViewTransactions}
          onEnableAction={this.onEnableAction}
          onDisableAction={this.onDisableAction}
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
export const ListClientsPage = withSnackbar(ListClientsPageComponent);

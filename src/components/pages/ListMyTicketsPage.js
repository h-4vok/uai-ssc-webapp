import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';
import { PlatformPageLayout } from '../organisms';
import { ListMyTicketsTemplate } from '../templates';
import { ConfirmDialog } from '../molecules';

const apiroute = 'supportticket';

class ListMyTicketsPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);

    this.state = {
      items: null,
      dialogOpen: false,
      dialogAfterAction: null,
      dataGridApi: null
    };
  }

  componentDidMount() {
    this.api.request
      .get(`${apiroute}?onlyMine=true`)
      .success(res => this.setState({ items: res.body.Result }))
      .go();
  }

  onRefresh = () => {
    this.api.request
      .get(`${apiroute}?onlyMine=true`)
      .success(res => this.setState({ items: res.body.Result }))
      .go();
  };

  onNewAction = () => {
    this.props.history.push(`/platform/support-ticket/start`);
  };

  onReplyAction = id => {
    this.props.history.push(`/${apiroute}/${id}/reply`);
  };

  onConfirmDialog = () => {
    this.state.dialogAfterAction();
    this.setState({ dialogOpen: false });
  };

  onCancelAction = (selectedItems, dataGridApi) => {
    this.setState({
      dialogOpen: true,
      dialogAfterAction: () => this.onCancelConfirm(selectedItems),
      dataGridApi
    });
  };

  onCancelConfirm = items => this.doPatchStatus(items, 'CANCELLED');

  doPatchStatus = (items, value) => {
    const operations = items.map(item => ({
      key: item.Id,
      op: 'replace',
      field: 'StatusCode',
      value
    }));

    const body = {
      Operations: operations
    };

    this.api.request
      .patch(apiroute, body, 0)
      .success(() => {
        this.state.dataGridApi.deselectAll();
        this.onRefresh();
      })
      .go();
  };

  render() {
    const { items, dialogOpen } = this.state;

    return (
      <PlatformPageLayout>
        <ListMyTicketsTemplate
          items={items}
          onRefresh={this.onRefresh}
          onNewAction={this.onNewAction}
          onReplyAction={this.onReplyAction}
          onCancelAction={this.onCancelAction}
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

export const ListMyTicketsPage = withSnackbar(ListMyTicketsPageComponent);

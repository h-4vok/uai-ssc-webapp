import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { PlatformPageLayout } from '../organisms';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';
import { ConfirmDialog } from '../molecules';
import { ListWorkOrdersTemplate } from '../templates';

const apiRoute = 'workorder';
const getEditRoute = (id = 'new') => `/work-order/work-order/${id}`;

class ListWorkOrdersPageComponent extends PureComponent {
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

  onNewAction = () => {
    this.props.history.push(getEditRoute());
  };

  onContinueAction = id => {
    this.props.history.push(getEditRoute(id));
  };

  onCancelAction = (selectedItems, dataGridApi) => {
    this.setState({
      dialogOpen: true,
      dialogAfterAction: () => this.onCancelConfirm(selectedItems),
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

    // this.api.request
    //   .patch(apiRoute, body, 0)
    //   .success(() => {
    //     this.state.dataGridApi.deselectAll();
    //     this.onRefresh();
    //   })
    //   .go();
  };

  onCancelConfirm = items => this.doPatchIsEnabled(items, true);

  onConfirmDialog = () => {
    this.state.dialogAfterAction();
    this.setState({ dialogOpen: false });
  };

  render() {
    const { items, dialogOpen } = this.state;

    return (
      <PlatformPageLayout>
        <ListWorkOrdersTemplate
          items={items}
          onRefresh={this.onRefresh}
          onNewAction={this.onNewAction}
          onContinueAction={this.onContinueAction}
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
export const ListWorkOrdersPage = withSnackbar(ListWorkOrdersPageComponent);

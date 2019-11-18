import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { PlatformPageLayout } from '../organisms';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';
import { ConfirmDialog } from '../molecules';
import { ListReceiptReturnRequestsTemplate } from '../templates';

const apiRoute = 'ReceiptReturnRequest';

class ListReceiptReturnRequestsPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(props);
    this.api = new API(this.notifier);

    this.state = {
      items: [],
      dialogOpen: false,
      dialogAfterAction: null
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

  onViewBill = id => this.props.history.push(`/client-management/bill/${id}`);

  onRejectAction = id =>
    this.props.history.push(`/management/receipt-return-request/reject/${id}`);

  onApproveAction = id => {
    this.setState({
      dialogOpen: true,
      dialogAfterAction: () => this.onApproveConfirm(id)
    });
  };

  onApproveConfirm = id => {
    this.api.request
      .put(apiRoute, {}, id)
      .success(this.onRefresh)
      .go();
  };

  onConfirmDialog = () => {
    this.state.dialogAfterAction();
    this.setState({ dialogOpen: false });
  };

  render() {
    const { items, dialogOpen } = this.state;

    return (
      <PlatformPageLayout>
        <ListReceiptReturnRequestsTemplate
          items={items}
          onRefresh={this.onRefresh}
          onViewBill={this.onViewBill}
          onRejectAction={this.onRejectAction}
          onApproveAction={this.onApproveAction}
          onViewCreditNote={this.onViewBill}
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
export const ListReceiptReturnRequestsPage = withSnackbar(
  ListReceiptReturnRequestsPageComponent
);

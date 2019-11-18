import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { API } from '../../lib/xhr';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { PlatformPageLayout } from '../organisms';
import { RejectReturnRequestTemplate } from '../templates';

class RejectReturnRequestPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.receiptId = this.props.match.params.id;

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);

    this.state = {
      model: {
        RejectionMotive: '',
        ReceiptId: this.receiptId
      }
    };
  }

  onConfirm = () => {
    this.api.request
      .post('receiptreturnrequest', this.state.model)
      .success(() =>
        this.props.history.push('/management/receipt-return-request')
      )
      .go();
  };

  render() {
    const { model } = this.state;

    return (
      <PlatformPageLayout>
        <RejectReturnRequestTemplate model={model} onConfirm={this.onConfirm} />
      </PlatformPageLayout>
    );
  }
}

export const RejectReturnRequestPage = withSnackbar(
  RejectReturnRequestPageComponent
);

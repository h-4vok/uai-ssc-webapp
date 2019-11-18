import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { API } from '../../lib/xhr';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { PrintBillTemplate } from '../templates';

class PrintBillPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.receiptId = this.props.match.params.id;

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);

    this.state = {
      receipt: null,
      showButtonBar: true
    };
  }

  componentDidMount() {
    this.api.request
      .getById('clientmanagement/billforprinting', this.receiptId)
      .success(res => this.setState({ receipt: res.body.Result }))
      .go();
  }

  goBack = () => {
    this.props.history.goBack();
  };

  printReceipt = () => {
    this.setState(
      {
        showButtonBar: false
      },
      () => {
        window.print();
        this.setState({ showButtonBar: true });
      }
    );
  };

  render() {
    const { receipt, showButtonBar } = this.state;
    const canGoBack = !!this.props.history.length;

    return (
      <PrintBillTemplate
        receipt={receipt}
        canGoBack={canGoBack}
        showButtonBar={showButtonBar}
        onBack={this.goBack}
        onPrint={this.printReceipt}
      />
    );
  }
}

export const PrintBillPage = withSnackbar(PrintBillPageComponent);

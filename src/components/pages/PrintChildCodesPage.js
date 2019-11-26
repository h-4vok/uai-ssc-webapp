import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { API } from '../../lib/xhr';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { PrintChildCodesTemplate } from '../templates';

class PrintChildCodesPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.workOrderId = this.props.match.params.id;

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);

    this.state = {
      expectedSamples: null,
      showButtonBar: true
    };
  }

  componentDidMount() {
    this.api.request
      .getById('workorder/expectedSamples', this.workOrderId)
      .success(res => this.setState({ expectedSamples: res.body.Result }))
      .go();
  }

  goBack = () => {
    this.props.history.goBack();
  };

  print = () => {
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
    const { expectedSamples, showButtonBar } = this.state;
    const canGoBack = !!this.props.history.length;

    return (
      <PrintChildCodesTemplate
        expectedSamples={expectedSamples}
        canGoBack={canGoBack}
        showButtonBar={showButtonBar}
        onBack={this.goBack}
        onPrint={this.print}
      />
    );
  }
}

export const PrintChildCodesPage = withSnackbar(PrintChildCodesPageComponent);

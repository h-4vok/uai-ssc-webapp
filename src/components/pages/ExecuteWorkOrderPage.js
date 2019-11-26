import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';
import { ExecuteWorkOrderTemplate } from '../templates';
import { PlatformPageLayout } from '../organisms';

class ExecuteWorkOrderPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);

    this.modelId = this.props.match.params.id;

    this.state = {
      expectedSamples: null
    };
  }

  componentDidMount() {
    this.onLoadModel();
  }

  onLoadModel = () => {
    this.api.request
      .getById('workorder/expectedsamples', this.modelId)
      .success(res => this.setState({ expectedSamples: res.body.Result }))
      .go();
  };

  onComplete = () => {
    const body = { Aliquots: this.state.expectedSamples };
    this.api.request
      .put('workorder/finish', body, this.modelId)
      .success(() => this.props.history.push('/work-order/work-order'))
      .go();
  };

  render() {
    const { expectedSamples } = this.state;

    return (
      <PlatformPageLayout>
        {expectedSamples && (
          <ExecuteWorkOrderTemplate
            expectedSamples={expectedSamples}
            onComplete={this.onComplete}
          />
        )}
      </PlatformPageLayout>
    );
  }
}

export const ExecuteWorkOrderPage = withSnackbar(ExecuteWorkOrderPageComponent);

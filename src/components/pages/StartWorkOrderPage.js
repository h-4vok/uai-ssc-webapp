import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { API } from '../../lib/xhr';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { PlatformPageLayout } from '../organisms';
import { StartWorkOrderTemplate } from '../templates';

class StartWorkOrderPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);

    this.state = {
      samples: [],
      model: {
        ParentSamples: [],
        ExpectedChilds: []
      }
    };
  }

  componentDidMount() {
    this.loadSamples();
  }

  loadSamples = () => {
    this.api.request
      .get('sample?functionCode=&typeCode=')
      .success(res => this.setState({ samples: res.body.Result }))
      .go();
  };

  onConfirm = () => {
    // asd
  };

  render() {
    const { model, samples } = this.state;

    return (
      <PlatformPageLayout>
        {samples && (
          <StartWorkOrderTemplate
            model={model}
            samples={samples}
            onConfirm={this.onConfirm}
          />
        )}
      </PlatformPageLayout>
    );
  }
}

export const StartWorkOrderPage = withSnackbar(StartWorkOrderPageComponent);

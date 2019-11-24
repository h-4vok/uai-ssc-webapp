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
      ParentSamples: [],
      ExpectedChilds: []
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
    const { ParentSamples, ExpectedChilds } = this.state;

    const body = { ParentSamples, ExpectedChilds };

    this.api.request
      .post('workorder', body)
      .success(() => this.props.history.push('/work-order/work-order'))
      .go();
  };

  onParentSelection = ParentSamples => {
    this.setState({ ParentSamples });
  };

  onExpectedChildsSetup = ExpectedChilds => {
    console.log({ ExpectedChilds });
    this.setState({ ExpectedChilds });
  };

  render() {
    const { ParentSamples, ExpectedChilds, samples } = this.state;

    return (
      <PlatformPageLayout>
        {samples && (
          <StartWorkOrderTemplate
            ParentSamples={ParentSamples}
            ExpectedChilds={ExpectedChilds}
            samples={samples}
            onConfirm={this.onConfirm}
            onParentSelection={this.onParentSelection}
            onExpectedChildsSetup={this.onExpectedChildsSetup}
          />
        )}
      </PlatformPageLayout>
    );
  }
}

export const StartWorkOrderPage = withSnackbar(StartWorkOrderPageComponent);

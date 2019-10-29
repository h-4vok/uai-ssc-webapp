import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { PlatformPageLayout } from '../organisms';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';
import { EditSampleTypeTemplate } from '../templates';

const apiRoute = 'sampletype';
const fallbackRoute = '/configuration/sample-type';

class EditSampleTypePageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.modelId = this.props.match.params.id;
    this.notifier = new SnackbarVisitor(props);
    this.api = new API(this.notifier);

    this.state = {
      model: {
        Parameters: []
      },
      sampleTypeParameters: [],
      allLoaded: false
    };
  }

  loadEverything = callback => {
    this.api.request
      .get('sampleparametertype')
      .success(res => {
        this.setState({ sampleTypeParameters: res.body.Result });
      })
      .success(() => {
        if (callback) {
          callback();
        } else {
          this.setState({ allLoaded: true });
        }
      })
      .go();
  };

  loadModel = () => {
    this.api.request
      .getById(apiRoute, this.modelId)
      .success(res => {
        this.setState({
          model: res.body.Result,
          allLoaded: true
        });
      })
      .go();
  };

  componentDidMount() {
    const callback = this.modelId ? this.loadModel : null;

    this.loadEverything(callback);
  }

  onConfirm = () => {
    if (this.modelId) {
      this.updateModel();
    } else {
      this.createModel();
    }
  };

  createModel = () => {
    this.api.request
      .post(apiRoute, this.state.model)
      .success(() => {
        this.props.history.push(fallbackRoute);
      })
      .go();
  };

  updateModel = () => {
    this.api.request
      .put(apiRoute, this.state.model, this.modelId)
      .success(() => {
        this.props.history.push(fallbackRoute);
      })
      .go();
  };

  render() {
    const { model, sampleTypeParameters, allLoaded } = this.state;

    return (
      <PlatformPageLayout>
        {allLoaded && (
          <EditSampleTypeTemplate
            modelId={this.modelId}
            model={model}
            sampleTypeParameters={sampleTypeParameters}
            onConfirm={() => this.onConfirm()}
          />
        )}
      </PlatformPageLayout>
    );
  }
}

export const EditSampleTypePage = withSnackbar(EditSampleTypePageComponent);

import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { PlatformPageLayout } from '../organisms';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';
import { EditSampleTypeParameterTemplate } from '../templates';

const apiRoute = 'sampleparametertype';
const fallbackRoute = '/configuration/sample-type-parameter';

class EditSampleTypeParameterPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.modelId = this.props.match.params.id;
    this.notifier = new SnackbarVisitor(props);
    this.api = new API(this.notifier);

    this.state = {
      model: {
        DecimalDigits: 0,
        MinimumRange: 0,
        MaximumRange: 0
      },
      unitOfMeasures: [],
      dataTypes: [],
      allLoaded: false
    };
  }

  loadEverything(callback) {
    this.api.request
      .get('unitofmeasure')
      .success(res => {
        this.setState({ unitOfMeasures: res.body.Result });
      })
      .success(() => {
        this.api.request
          .get('parameterdatatype')
          .success(res => {
            this.setState({ dataTypes: res.body.Result });
          })
          .success(() => {
            if (callback) {
              callback();
            } else {
              this.setState({ allLoaded: true });
            }
          })
          .go();
      })
      .go();
  }

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
    const { model, unitOfMeasures, dataTypes, allLoaded } = this.state;

    return (
      <PlatformPageLayout>
        {allLoaded && (
          <EditSampleTypeParameterTemplate
            modelId={this.modelId}
            model={model}
            dataTypes={dataTypes}
            unitOfMeasures={unitOfMeasures}
            onConfirm={() => this.onConfirm()}
          />
        )}
      </PlatformPageLayout>
    );
  }
}

export const EditSampleTypeParameterPage = withSnackbar(
  EditSampleTypeParameterPageComponent
);

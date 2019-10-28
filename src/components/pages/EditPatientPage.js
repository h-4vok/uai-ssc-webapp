import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { PlatformPageLayout } from '../organisms';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';
import { EditPatientTemplate } from '../templates';

const apiRoute = 'patient';
const fallbackRoute = '/inventory/patient';

class EditPatientPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.modelId = this.props.match.params.id;
    this.notifier = new SnackbarVisitor(props);
    this.api = new API(this.notifier);

    this.state = {
      model: {},
      patientTypes: [],
      allLoaded: false
    };
  }

  loadEverything = callback => {
    this.api.request
      .get('patienttype')
      .success(res => {
        this.setState({ patientTypes: res.body.Result });
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
    const { model, patientTypes, allLoaded } = this.state;

    return (
      <PlatformPageLayout>
        {allLoaded && (
          <EditPatientTemplate
            modelId={this.modelId}
            model={model}
            patientTypes={patientTypes}
            onConfirm={() => this.onConfirm()}
          />
        )}
      </PlatformPageLayout>
    );
  }
}

export const EditPatientPage = withSnackbar(EditPatientPageComponent);

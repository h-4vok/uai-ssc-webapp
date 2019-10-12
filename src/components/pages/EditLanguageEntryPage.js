import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { PlatformPageLayout } from '../organisms';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';
import { EditLanguageEntryTemplate } from '../templates';

class EditLanguageEntryPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.modelId = this.props.match.params.id;
    this.notifier = new SnackbarVisitor(props);
    this.api = new API(this.notifier);

    this.state = {
      model: {},
      loaded: false
    };
  }

  componentDidMount() {
    this.api.request
      .getById('systemLanguageEntry', this.modelId)
      .success(res => {
        const model = res.body.Result;

        this.setState({
          model,
          loaded: true
        });
      })
      .go();
  }

  onConfirm() {
    const body = this.state.model;

    this.api.request
      .put('systemLanguage', body, this.modelId)
      .success(() => {
        this.props.history.push('/configuration/language');
      })
      .go();
  }

  onCancel() {
    this.props.history.push('/configuration/language');
  }

  render() {
    const { model, loaded } = this.state;

    return (
      <PlatformPageLayout>
        {loaded && (
          <EditLanguageEntryTemplate
            modelId={this.modelId}
            model={model}
            onConfirm={() => this.onConfirm()}
            onCancel={() => this.onCancel()}
          />
        )}
      </PlatformPageLayout>
    );
  }
}

export const EditLanguageEntryPage = withSnackbar(
  EditLanguageEntryPageComponent
);

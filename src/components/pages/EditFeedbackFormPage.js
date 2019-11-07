import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { PlatformPageLayout } from '../organisms';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';
import { EditFeedbackFormTemplate } from '../templates';

const apiRoute = 'feedbackform';
const fallbackRoute = '/marketing/feedback-form';

class EditFeedbackFormPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(props);
    this.api = new API(this.notifier);

    this.state = {
      model: {}
    };
  }

  onConfirm = () => {
    this.createModel();
  };

  createModel = () => {
    this.api.request
      .post(apiRoute, this.state.model)
      .success(() => {
        this.props.history.push(fallbackRoute);
      })
      .go();
  };

  render() {
    const { model } = this.state;

    return (
      <PlatformPageLayout>
        <EditFeedbackFormTemplate
          model={model}
          onConfirm={() => this.onConfirm()}
        />
      </PlatformPageLayout>
    );
  }
}

export const EditFeedbackFormPage = withSnackbar(EditFeedbackFormPageComponent);

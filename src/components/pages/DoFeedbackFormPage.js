import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { PlatformPageLayout } from '../organisms';
import { DoFeedbackFormTemplate } from '../templates';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';
import withLocalization from '../../localization/withLocalization';

const apiroute = 'submittedfeedbackform';

class DoFeedbackFormPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);

    this.state = {
      allLoaded: false,
      feedbackForm: null,
      model: {}
    };
  }

  componentDidMount() {
    this.api.request
      .get('feedbackform/0?isCurrent=true')
      .success(res => {
        this.setState({ feedbackForm: res.body.Result, allLoaded: true });
      })
      .go();
  }

  onConfirm = () => {
    const { Answers } = this.state.model;
    const { i10n } = this.props;

    for (let i = 0; i < Answers.length; i++) {
      const answer = Answers[i];

      if (!answer.Choice) {
        this.notifier.error(
          i10n['submitted-feedback-form.validation.choice-null']
        );
        return;
      }
    }

    this.api.request
      .post(apiroute, this.state.model)
      .preventDefaultSuccess()
      .success(() =>
        this.notifier.success(i10n['submitted-feedback-form.thank-you'])
      )
      .success(() => this.props.history.push('/platform-home'))
      .go();
  };

  createModel() {
    this.api.request
      .post(apiroute, this.state.model)
      .success(() => {
        this.props.history.push('/platform-home');
      })
      .go();
  }

  render() {
    const { allLoaded, feedbackForm, model } = this.state;

    return (
      <PlatformPageLayout>
        {allLoaded && (
          <DoFeedbackFormTemplate
            onConfirm={this.onConfirm}
            model={model}
            feedbackForm={feedbackForm}
          />
        )}
      </PlatformPageLayout>
    );
  }
}

export const DoFeedbackFormPage = withLocalization(
  withSnackbar(DoFeedbackFormPageComponent)
);

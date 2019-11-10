import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { API } from '../../lib/xhr';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { SurveySubmission } from './SurveySubmission';

class RandomSurveyPresenterComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);

    this.state = {
      currentSurvey: null
    };
  }

  componentDidMount() {
    this.api.request
      .get('surveyform?getOneRandom=true')
      .preventDefaultError()
      .preventDefaultFailure()
      .success(res => {
        const list = res.body.Result;

        if (list && list.length) {
          this.setState({
            currentSurvey: list[0]
          });
        }
      })
      .go();
  }

  onChoiceClick = choice => {
    const body = {
      SurveyForm: this.state.currentSurvey,
      SurveyChoice: choice
    };

    this.api.request
      .post('submittedsurvey', body)
      .success(() => this.props.onSubmission(this.state.currentSurvey.Id))
      .go();
  };

  render() {
    const { currentSurvey } = this.state;

    return (
      currentSurvey && (
        <SurveySubmission
          title={currentSurvey.QuestionTitle}
          choices={currentSurvey.Choices}
          onClick={this.onChoiceClick}
        />
      )
    );
  }
}

export const RandomSurveyPresenter = withSnackbar(
  RandomSurveyPresenterComponent
);

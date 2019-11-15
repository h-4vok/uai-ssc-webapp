import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { API } from '../../lib/xhr';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { SurveySubmission } from './SurveySubmission';
import { SurveyResults } from '../molecules';

class RandomSurveyPresenterComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);

    this.state = {
      currentSurvey: null,
      showSurvey: false,
      surveyData: null
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
            currentSurvey: list[0],
            showSurvey: true
          });
        }
      })
      .go();
  }

  loadResults = () => {
    this.api.request
      .getById('submittedsurvey', this.state.currentSurvey.Id)
      .success(res =>
        this.setState({
          surveyData: this.mapResults(res.body.Result),
          showSurvey: false
        })
      )
      .success(() => {
        window.setTimeout(
          () => window.scrollTo(0, document.body.scrollHeight),
          1000
        );
      })
      .go();
  };

  mapResults = results =>
    results.map(r => ({ label: r.Label, y: r.Percentage }));

  showResults = () => {
    this.loadResults();
  };

  onChoiceClick = choice => {
    const body = {
      SurveyForm: this.state.currentSurvey,
      SurveyChoice: choice
    };

    this.api.request
      .post('submittedsurvey', body)
      .preventDefaultSuccess()
      .success(this.showResults)
      .go();
  };

  render() {
    const { showSurvey, currentSurvey, surveyData } = this.state;

    return (
      <>
        {showSurvey && (
          <SurveySubmission
            title={currentSurvey.QuestionTitle}
            choices={currentSurvey.Choices}
            onClick={this.onChoiceClick}
          />
        )}
        {surveyData && (
          <SurveyResults
            containerId="survey-container-home"
            title={currentSurvey.QuestionTitle}
            data={surveyData}
          />
        )}
      </>
    );
  }
}

export const RandomSurveyPresenter = withSnackbar(
  RandomSurveyPresenterComponent
);

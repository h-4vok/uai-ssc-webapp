import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { Typography, Container } from '@material-ui/core';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';
import { PageLayout } from '../organisms';
import { SurveyResults } from '../molecules';
import withLocalization from '../../localization/withLocalization';

class SurveyResultsPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.surveyId = this.props.match.params.id;

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);

    this.state = {
      surveyTitle: '',
      data: null
    };
  }

  loadSurvey = () => {
    this.api.request
      .getById('surveyform', this.surveyId)
      .success(res =>
        this.setState({ surveyTitle: res.body.Result.QuestionTitle })
      )
      .success(this.loadResults)
      .go();
  };

  loadResults = () => {
    this.api.request
      .getById('submittedsurvey', this.surveyId)
      .success(res => this.setState({ data: this.mapResults(res.body.Result) }))
      .go();
  };

  mapResults = results =>
    results.map(r => ({ label: r.Label, y: r.Percentage }));

  componentDidMount() {
    this.loadSurvey();
  }

  render() {
    const { i10n } = this.props;
    const { surveyTitle, data } = this.state;

    return (
      <PageLayout>
        <Container component="main" maxWidth="md">
          <Typography variant="h4">
            {i10n['survey-results.page.title']}
          </Typography>
          {data && (
            <SurveyResults
              containerId="survey-container-1"
              title={surveyTitle}
              data={data}
            />
          )}
        </Container>
      </PageLayout>
    );
  }
}

export const SurveyResultsPage = withLocalization(
  withSnackbar(SurveyResultsPageComponent)
);

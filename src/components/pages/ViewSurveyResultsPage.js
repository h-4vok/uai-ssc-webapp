import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { Grid, Container, Typography } from '@material-ui/core';
import { API } from '../../lib/xhr';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { PlatformPageLayout } from '../organisms';
import { SurveyResults, SurveyResultsGrid } from '../molecules';
import withLocalization from '../../localization/withLocalization';

class ViewSurveyResultsPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.surveyId = this.props.match.params.id;

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);

    this.state = {
      title: '',
      data: null,
      items: null
    };
  }

  loadSurvey = () => {
    this.api.request
      .getById('surveyform', this.surveyId)
      .success(res => this.setState({ title: res.body.Result.QuestionTitle }))
      .success(this.loadResults)
      .go();
  };

  loadResults = () => {
    this.api.request
      .getById('submittedsurvey', this.surveyId)
      .success(res =>
        this.setState({
          data: this.mapResults(res.body.Result),
          items: res.body.Result
        })
      )
      .go();
  };

  mapResults = results =>
    results.map(r => ({ label: r.Label, y: r.Percentage }));

  componentDidMount() {
    this.loadSurvey();
  }

  render() {
    const { i10n } = this.props;
    const { title, data, items } = this.state;

    return (
      <PlatformPageLayout>
        <Container maxWidth="md">
          <Grid container maxWidth="md">
            <Grid item xs={12}>
              <Typography variant="h4">
                {i10n['survey-results.page.title']}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {items && <SurveyResultsGrid items={items} />}
            </Grid>
            <Grid item xs={12}>
              {data && (
                <SurveyResults
                  containerId="survey-container-1"
                  title={title}
                  data={data}
                />
              )}
            </Grid>
          </Grid>
        </Container>
      </PlatformPageLayout>
    );
  }
}

export const ViewSurveyResultsPage = withLocalization(
  withSnackbar(ViewSurveyResultsPageComponent)
);

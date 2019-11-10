import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { Grid, Container, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { API } from '../../lib/xhr';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { PlatformPageLayout } from '../organisms';
import { SurveyResults, SurveyResultsGrid } from '../molecules';
import withLocalization from '../../localization/withLocalization';

const styles = () => ({
  graphGrid: {
    minHeight: '450px'
  }
});

class ViewFeedbackFormResultsPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.formId = this.props.match.params.id;

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);

    this.state = {
      questions: null
    };
  }

  loadFeedbackFormResults = () => {
    this.api.request
      .getById('submittedfeedbackform', this.formId)
      .success(res => {
        const questions = res.body.Result;

        questions.forEach(question => {
          question.Data.forEach(choiceData => {
            choiceData.label = choiceData.Label;
            choiceData.y = choiceData.Percentage;
          });
        });

        this.setState({ questions });
      })
      .go();
  };

  mapResults = results =>
    results.map(r => ({ label: r.Label, y: r.Percentage }));

  componentDidMount() {
    this.loadFeedbackFormResults();
  }

  buildEveryQuestion = questions => {
    const output = questions.map((question, idx) => (
      <React.Fragment key={`item-${idx}`}>
        <Grid item xs={12}>
          <Typography variant="h6">{question.QuestionTitle}</Typography>
        </Grid>
        <Grid item xs={12}>
          <SurveyResultsGrid items={question.Data} />
        </Grid>
        <Grid item xs={12} className={this.props.classes.graphGrid}>
          <SurveyResults
            containerId={`result-container-${idx}`}
            title={question.QuestionTitle}
            data={question.Data}
          />
        </Grid>
      </React.Fragment>
    ));

    return output;
  };

  render() {
    const { i10n } = this.props;
    const { questions } = this.state;

    return (
      <PlatformPageLayout>
        <Container maxWidth="md">
          <Grid container maxWidth="md" spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h4">
                {i10n['feedback-form-results.page.title']}
              </Typography>
            </Grid>
            {questions && this.buildEveryQuestion(questions)}
          </Grid>
        </Container>
      </PlatformPageLayout>
    );
  }
}

export const ViewFeedbackFormResultsPage = withStyles(styles)(
  withLocalization(withSnackbar(ViewFeedbackFormResultsPageComponent))
);

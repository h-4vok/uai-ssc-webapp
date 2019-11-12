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

class CompareFeedbackFormsPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.formId1 = this.props.match.params.id1;
    this.formId2 = this.props.match.params.id2;

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);

    this.state = {
      questions1: null,
      questions2: null
    };
  }

  loadFeedbackFormResults = ref => {
    this.api.request
      .getById('submittedfeedbackform', this[`formId${ref}`])
      .success(res => {
        const questions = res.body.Result;

        questions.forEach(question => {
          question.Data.forEach(choiceData => {
            choiceData.label = choiceData.Label;
            choiceData.y = choiceData.Percentage;
          });
        });

        this.setState({ [`questions${ref}`]: questions });
      })
      .go();
  };

  componentDidMount() {
    this.loadFeedbackFormResults(1);
    this.loadFeedbackFormResults(2);
  }

  buildEveryQuestion = (ref, questions) => {
    const output = questions.map((question, idx) => (
      <React.Fragment key={`item-${ref}-${idx}`}>
        <Grid item xs={12}>
          <Typography variant="h6">{question.QuestionTitle}</Typography>
        </Grid>
        <Grid item xs={12}>
          <SurveyResultsGrid items={question.Data} />
        </Grid>
        <Grid item xs={12} className={this.props.classes.graphGrid}>
          <SurveyResults
            containerId={`result-container-${ref}-${idx}`}
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
    const { questions1, questions2 } = this.state;

    return (
      <PlatformPageLayout>
        <Container maxWidth="lg">
          <Grid container maxWidth="lg" spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h4">
                {i10n['feedback-form-results.page.title']}
              </Typography>
            </Grid>
            <Grid item xs={6} alignItems="flex-start">
              {questions1 && this.buildEveryQuestion(1, questions1)}
            </Grid>
            <Grid item xs={6} alignItems="flex-start">
              {questions2 && this.buildEveryQuestion(2, questions2)}
            </Grid>
          </Grid>
        </Container>
      </PlatformPageLayout>
    );
  }
}

export const CompareFeedbackFormsPage = withStyles(styles)(
  withLocalization(withSnackbar(CompareFeedbackFormsPageComponent))
);

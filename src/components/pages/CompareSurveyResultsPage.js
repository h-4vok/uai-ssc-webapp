import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Container, Typography } from '@material-ui/core';
import { API } from '../../lib/xhr';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { PlatformPageLayout } from '../organisms';
import { SurveyResults, SurveyResultsGrid } from '../molecules';
import withLocalization from '../../localization/withLocalization';

const styles = () => ({
  leftBorder: {
    borderLeft: '1px solid black'
  },
  rightBorder: {
    borderRight: '1px solid black'
  },
  graphContainer: {
    minHeight: '450px'
  }
});

class CompareSurveyResultsPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.surveyId1 = this.props.match.params.id1;
    this.surveyId2 = this.props.match.params.id2;

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);

    this.state = {
      data1: null,
      items1: null,
      data2: null,
      items2: null,
      title1: null,
      title2: null
    };
  }

  loadResults = ref => {
    this.api.request
      .getById('submittedsurvey', this[`surveyId${ref}`])
      .success(res =>
        this.setState({
          [`data${ref}`]: this.mapResults(res.body.Result),
          [`items${ref}`]: res.body.Result
        })
      )
      .go();
  };

  loadSurvey = ref => {
    this.api.request
      .getById('surveyform', this[`surveyId${ref}`])
      .success(res =>
        this.setState({ [`title${ref}`]: res.body.Result.QuestionTitle })
      )
      .go();
  };

  mapResults = results =>
    results.map(r => ({ label: r.Label, y: r.Percentage }));

  componentDidMount() {
    this.loadSurvey(1);
    this.loadSurvey(2);
    this.loadResults(1);
    this.loadResults(2);
  }

  render() {
    const { i10n, classes } = this.props;
    const { title1, title2, data1, data2, items1, items2 } = this.state;

    return (
      <PlatformPageLayout>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h4">
                {i10n['survey-results.compare.page.title']}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              {title1 && <Typography variant="h5">{title1}</Typography>}
            </Grid>
            <Grid item xs={6}>
              {title2 && <Typography variant="h5">{title2}</Typography>}
            </Grid>
            <Grid item xs={6} className={classes.rightBorder}>
              {items1 && <SurveyResultsGrid items={items1} />}
            </Grid>
            <Grid item xs={6} className={classes.leftBorder}>
              {items2 && <SurveyResultsGrid items={items2} />}
            </Grid>
            <Grid
              item
              xs={6}
              className={`${classes.rightBorder} ${classes.graphContainer}`}
            >
              {data1 && (
                <SurveyResults containerId="survey-container-1" data={data1} />
              )}
            </Grid>
            <Grid
              item
              xs={6}
              className={`${classes.leftBorder} ${classes.graphContainer}`}
            >
              {data2 && (
                <SurveyResults containerId="survey-container-2" data={data2} />
              )}
            </Grid>
          </Grid>
        </Container>
      </PlatformPageLayout>
    );
  }
}

export const CompareSurveyResultsPage = withStyles(styles)(
  withLocalization(withSnackbar(CompareSurveyResultsPageComponent))
);

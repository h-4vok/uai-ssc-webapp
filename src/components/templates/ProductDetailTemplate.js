import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Tabs,
  Tab,
  AppBar,
  Container,
  Grid,
  Box,
  Typography,
  Button
} from '@material-ui/core';
import { Grade, QuestionAnswer } from '@material-ui/icons';
import Rating from '@material-ui/lab/Rating';
import withLocalization from '../../localization/withLocalization';
import { PricingCard } from '../molecules';
import { manualTimezoneFix } from '../../lib/manualTimezoneFix';
import { displayDateTimeFormat } from '../../lib/displayDateTimeFormat';
import { SimpleTextField } from '../atoms';

const styles = theme => ({
  boldParagraph: {
    fontWeight: 'bold',
    marginRight: theme.spacing(3)
  },
  commentParagraph: {
    fontSize: 12
  },
  commentGrid: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
});

function QuestionAndAnswerBox({
  model: {
    Question,
    QuestionBy,
    PostedDate,
    ReplyByDescription,
    RepliedDate,
    Reply
  }
}) {
  return (
    <Box
      ml={2}
      mr={2}
      style={{ backgroundColor: 'whitesmoke ', padding: '10px' }}
    >
      <Container>
        <Typography style={{ fontSize: 11 }}>
          {QuestionBy} - {PostedDate}
        </Typography>
        <Typography style={{ fontSize: 13 }}>
          <pre style={{ fontFamily: 'inherit' }}>
            <span style={{ fontWeight: 'bold ' }}>Pregunta: </span>
            {Question}
          </pre>
        </Typography>
      </Container>

      {Reply && (
        <Container>
          <Typography style={{ fontSize: 11 }}>
            {ReplyByDescription} - {RepliedDate}
          </Typography>
          <Typography style={{ fontSize: 13 }}>
            <pre style={{ fontFamily: 'inherit' }}>
              <span style={{ fontWeight: 'bold ' }}>Respuesta: </span>
              {Reply}
            </pre>
          </Typography>
        </Container>
      )}
    </Box>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

class ProductDetailTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    const normalizedCode = this.props.planCode.replace('pricing-plan--', '');

    this.state = {
      product: this.buildProduct(this.props.i10n, normalizedCode),
      tabValue: 0,
      newQuestion: '',
      yourName: ''
    };
  }

  handleTabChange = (evt, newTab) => this.setState({ tabValue: newTab });

  buildProduct = (i10n, descriptor) => ({
    title: i10n[`pricing-plan.${descriptor}.title`],
    code: `pricing-plan--${descriptor}`,
    subheader: i10n[`pricing-plan.${descriptor}.subheader`],
    price: i10n[`pricing-plan.${descriptor}.price`],
    billFrequency: i10n[`pricing-plan.${descriptor}.billFrequency`],
    planDescription: i10n[`pricing-plan.${descriptor}.planDescription`],
    patientSamplesDescription:
      i10n[`pricing-plan.${descriptor}.patientSamplesDescription`],
    controlSamplesDescription:
      i10n[`pricing-plan.${descriptor}.controlSamplesDescription`],
    userAccountsDescription:
      i10n[`pricing-plan.${descriptor}.userAccountsDescription`],
    runExecutionsDescription:
      i10n[`pricing-plan.${descriptor}.runExecutionsDescription`],
    signUpDescription: i10n[`pricing-plan.${descriptor}.signUpDescription`]
  });

  getQuestionConfirmBody = () => {
    return {
      Question: this.state.newQuestion,
      QuestionBy: this.state.yourName
    };
  };

  onInputChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

  clearQuestionFields = () => {
    this.setState({
      newQuestion: '',
      yourName: ''
    });
  };

  render() {
    const { i10n, model, classes, onQuestionConfirm, questions } = this.props;
    const { product, tabValue, newQuestion, yourName } = this.state;

    return (
      <Container main maxWidth="md">
        <Grid container>
          <Grid item xs={2} />
          <Grid item xs={8}>
            <PricingCard {...product} noSelection />
          </Grid>
          <Grid item xs={2} />
        </Grid>
        <Box m={2}>
          <AppBar position="static" color="default">
            <Tabs
              value={tabValue}
              onChange={this.handleTabChange}
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label={i10n['product-detail.scores']} icon={<Grade />} />
              <Tab
                label={i10n['product-detail.questions']}
                icon={<QuestionAnswer />}
              />
            </Tabs>
          </AppBar>
        </Box>
        <TabPanel value={tabValue} index={0}>
          <Grid container>
            <Grid item xs={12}>
              <Box mt={2}>
                <Grid container>
                  <Grid item xs={3}>
                    {i10n['product-detail.average.rating']}
                  </Grid>
                  <Grid
                    container
                    item
                    xs={9}
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                  >
                    <Typography variant="h5">
                      {model.Comments.length
                        ? model.AverageRating
                        : i10n['product-detail.no-scoring-yet']}
                    </Typography>
                    <Rating
                      value={model.Comments.length ? model.AverageRating : 0}
                      readOnly
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
          <Grid>
            <Box mt={3} />
          </Grid>
          {model.Comments.map(item => (
            <Grid container className={classes.commentGrid}>
              <Grid item xs={3}>
                <Rating readOnly value={item.Rating} />
              </Grid>
              <Grid
                container
                item
                xs={9}
                direction="row"
                justify="flex-start"
                alignItems="center"
              >
                <Typography className={classes.boldParagraph}>
                  {item.CommentBy}
                </Typography>
                <Typography>
                  {displayDateTimeFormat(manualTimezoneFix(item.CreatedDate))}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.commentParagraph}>
                  {item.Comment}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <SimpleTextField
                label={i10n['product-detail.your-name']}
                value={yourName}
                onChange={this.onInputChange}
                name="yourName"
                fullWidth
                maxLength="100"
              />
            </Grid>
            <Grid item xs={8} />
            <Grid item xs={12}>
              <SimpleTextField
                label={i10n['product-detail.your-question']}
                value={newQuestion}
                onChange={this.onInputChange}
                name="newQuestion"
                fullWidth
                maxLength="500"
                multiline
                rows="4"
                rowsMax="4"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={() =>
                  onQuestionConfirm(
                    this.getQuestionConfirmBody(),
                    i10n,
                    this.clearQuestionFields
                  )
                }
                color="primary"
                variant="contained"
              >
                {i10n['product-detail.action.send-question']}
              </Button>
            </Grid>
            {questions.map(q => (
              <Grid item xs={12}>
                <QuestionAndAnswerBox model={q} />
                <hr />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </Container>
    );
  }
}

export const ProductDetailTemplate = withStyles(styles)(
  withLocalization(ProductDetailTemplateComponent)
);

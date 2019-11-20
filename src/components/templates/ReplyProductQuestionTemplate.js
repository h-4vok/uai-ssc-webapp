import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withLocalization from '../../localization/withLocalization';
import { SimpleTextField } from '../atoms';
import { fromI10n } from '../../lib/GlobalState';

const styles = theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

const LabelAndText = ({ i10nkey, value }) => (
  <Typography>
    <span style={{ fontWeight: 'bold' }}>
      {fromI10n(i10nkey)}
      &nbsp;
    </span>
    {value}
  </Typography>
);

class ReplyProductQuestionTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    const { Reply } = this.props.model;

    this.state = {
      Reply
    };
  }

  onInputChange = event => {
    this.props.model[event.target.name] = event.target.value;
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes, onConfirm, i10n } = this.props;
    const {
      Question,
      QuestionBy,
      PostedDate,
      PricingPlanName
    } = this.props.model;
    const { Reply } = this.state;

    return (
      <Container component="main" maxWidth="md">
        <div className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            {i10n['management.product-question.reply.title']}
          </Typography>
        </div>
        <form className={classes.form} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <LabelAndText
                i10nkey="management.product-question.reply.field.question-by"
                value={QuestionBy}
              />
            </Grid>
            <Grid item xs={12}>
              <LabelAndText
                i10nkey="management.product-question.reply.field.posted-date"
                value={PostedDate}
              />
            </Grid>
            <Grid item xs={12}>
              <LabelAndText
                i10nkey="management.product-question.reply.field.pricing-plan-name"
                value={PricingPlanName}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography style={{ fontSize: 13 }}>
                <pre style={{ fontFamily: 'inherit' }}>
                  <span style={{ fontWeight: 'bold ' }}>Pregunta: </span>
                  {Question}
                </pre>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <SimpleTextField
                required
                maxLength="500"
                name="Reply"
                label={i10n['management.product-question.reply.field.reply']}
                fullWidth
                value={Reply}
                onChange={this.onInputChange}
                multiline
                rowsMax="4"
                rows="4"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={onConfirm}
              >
                {i10n['global.confirm']}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    );
  }
}

export const ReplyProductQuestionTemplate = withLocalization(
  withStyles(styles)(ReplyProductQuestionTemplateComponent)
);

import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import Typography from '@material-ui/core/Typography';
import withLocalization from '../../localization/withLocalization';
import { SimpleTextField } from '../atoms';
import { ButtonBar } from '../molecules';

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

class EditSurveyFormTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    const { QuestionTitle, Choices, ExpirationDate } = this.props.model;

    this.state = {
      QuestionTitle,
      Choices,
      ExpirationDate
    };
  }

  isEditAction() {
    return this.props.model && this.props.model.Id;
  }

  onInputChange = event => {
    this.props.model[event.target.name] = event.target.value;
    this.setState({ [event.target.name]: event.target.value });
  };

  onExpirationDateChange = date => {
    this.props.model.ExpirationDate = date;
    this.setState({ ExpirationDate: date });
  };

  updateModelChoices = () => (this.props.model.Choices = this.state.Choices);

  addChoice = () => {
    const newChoice = { Id: null, ChoiceTitle: '' };
    this.setState(
      prevState => ({
        Choices: [...prevState.Choices, newChoice]
      }),
      this.updateModelChoices
    );
  };

  removeChoice = () => {
    this.setState(
      prevState => ({
        Choices: prevState.Choices.filter(
          (item, index) => index !== prevState.Choices.length - 1
        )
      }),
      this.updateModelChoices
    );
  };

  onChoiceChange = i => evt => {
    const { value } = evt.target;

    this.setState(
      prevState => ({
        Choices: prevState.Choices.map((choice, idx) => {
          if (idx !== i) return choice;
          return { ChoiceTitle: value };
        })
      }),
      this.updateModelChoices
    );
  };

  buildChoices = choices => {
    const output = [];

    const { i10n } = this.props;

    choices.forEach((choice, idx) => {
      const key = `choice-${idx}`;

      const elem = (
        <Grid item xs={12} key={key}>
          <SimpleTextField
            required
            maxLength="100"
            id={key}
            name="ChoiceTitle"
            label={i10n['survey-choice.choice-title']}
            fullWidth
            value={choice.ChoiceTitle}
            onChange={this.onChoiceChange(idx)}
          />
        </Grid>
      );

      output.push(elem);
    });

    return output;
  };

  render() {
    const { classes, onConfirm, i10n } = this.props;
    const { QuestionTitle, Choices, ExpirationDate } = this.state;

    return (
      <Container component="main" maxWidth="lg">
        <div className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            {this.props.modelId
              ? i10n['marketing.survey-form.title.edit']
              : i10n['marketing.survey-form.title.new']}
          </Typography>
        </div>
        <form className={classes.form} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <SimpleTextField
                required
                maxLength="500"
                id="QuestionTitle"
                name="QuestionTitle"
                label={i10n['survey-form.question-title']}
                fullWidth
                value={QuestionTitle}
                onChange={this.onInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="ExpirationDate"
                  name="ExpirationDate"
                  label="Date picker dialog"
                  format="dd/MM/yyyy"
                  value={ExpirationDate}
                  onChange={this.onExpirationDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={12}>
              <ButtonBar>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={this.addChoice}
                >
                  {'+'}
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={this.removeChoice}
                >
                  {'-'}
                </Button>
              </ButtonBar>
            </Grid>
            {this.buildChoices(Choices)}

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

export const EditSurveyFormTemplate = withLocalization(
  withStyles(styles)(EditSurveyFormTemplateComponent)
);

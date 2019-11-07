import React, { PureComponent } from 'react';
import { Grid, Container, Button } from '@material-ui/core';
import { SimpleTextField } from '../atoms';
import withLocalization from '../../localization/withLocalization';
import { ButtonBar } from '../molecules';

class EditFeedbackFormQuestionFormComponent extends PureComponent {
  constructor(props) {
    super(props);

    const { Question, Choices } = this.props.model;

    this.state = {
      Question,
      Choices
    };
  }

  onInputChange = event => {
    this.props.model[event.target.name] = event.target.value;
    this.setState({ [event.target.name]: event.target.value });
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
            label={i10n['feedback-form-question-choice.choice-title']}
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
    const { i10n } = this.props;
    const { Question, Choices } = this.state;

    return (
      <Container main maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <SimpleTextField
              required
              maxLength="100"
              id="Question"
              name="Question"
              label={i10n['feedback-form-question.question']}
              fullWidth
              value={Question}
              onChange={this.onInputChange}
            />
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
        </Grid>
      </Container>
    );
  }
}

export const EditFeedbackFormQuestionForm = withLocalization(
  EditFeedbackFormQuestionFormComponent
);

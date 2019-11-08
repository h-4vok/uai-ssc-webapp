/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Container, Box, Typography, Button } from '@material-ui/core';
import withLocalization from '../../localization/withLocalization';
import { SimpleSelect } from '../atoms';

class DoFeedbackFormTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      model: this.props.model
    };

    this.state.model.Form = this.props.feedbackForm;
    this.state.model.Answers = [];
    this.state.selectedAnswers = this.props.feedbackForm.Questions.map(
      () => null
    );
  }

  onChoiceChange = i => evt => {
    const { value } = evt.target;

    this.setState(prevState => ({
      selectedAnswers: prevState.selectedAnswers.map((answer, idx) => {
        if (idx !== i) return answer;
        return value;
      })
    }));
  };

  getAnswerValue = idx => this.state.selectedAnswers[idx];

  buildQuestions = () => {
    const { Questions } = this.props.feedbackForm;

    const output = Questions.map((question, idx) => (
      <Box m={3} key={`question-${idx}`}>
        <SimpleSelect
          required
          name={`select-${idx}`}
          label={question.Question}
          fullWidth
          items={question.Choices.map(choice => ({
            value: choice.Id,
            label: choice.ChoiceTitle
          }))}
          value={this.state.selectedAnswers[idx]}
          onChange={this.onChoiceChange(idx)}
        />
      </Box>
    ));

    return output;
  };

  updateModel = () => {
    const answers = this.state.selectedAnswers.map((answerId, idx) => {
      const question = this.props.feedbackForm.Questions[idx];

      return {
        Id: null,
        Question: question,
        Choice: question.Choices.find(choice => choice.Id === answerId)
      };
    });

    this.props.model.Answers = answers;
  };

  onConfirm = () => {
    this.updateModel();

    this.props.onConfirm(this.props.model);
  };

  render() {
    const { i10n } = this.props;

    return (
      <Container maxWidth="md">
        <Typography variant="h3">
          {i10n['submitted-feedback-form.page.title']}
        </Typography>
        <Typography variant="h5">
          {i10n['submitted-feedback-form.page.subtitle']}
        </Typography>
        {this.buildQuestions()}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => this.onConfirm()}
        >
          {i10n['global.confirm']}
        </Button>
      </Container>
    );
  }
}

export const DoFeedbackFormTemplate = withLocalization(
  DoFeedbackFormTemplateComponent
);

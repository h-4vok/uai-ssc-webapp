/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel
} from '@material-ui/core';

export class FeedbackFormChoices extends PureComponent {
  render() {
    const { Choices } = this.props;

    return (
      <FormControl component="fieldset">
        <FormLabel component="legend" />
        <RadioGroup
          row
          value={this.props.value}
          onChange={this.props.handleChange}
        >
          {Choices.map((choice, idx) => (
            <FormControlLabel
              key={`choice-${idx}`}
              value={choice}
              label={choice.ChoiceTitle}
              control={<Radio color="primary" />}
            />
          ))}
        </RadioGroup>
      </FormControl>
    );
  }
}

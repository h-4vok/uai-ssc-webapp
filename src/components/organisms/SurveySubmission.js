import React from 'react';
import { Container, Typography, Grid } from '@material-ui/core';
import { SurveyOption } from '../molecules';
import { fromI10n } from '../../lib/GlobalState';

const onChoiceClick = (idx, choice, onClick) => () => onClick(choice, idx);

const buildChoices = (choices, onClick) => {
  const output = [];

  choices.forEach((choice, idx) => {
    const key = `choice-${idx}`;

    const elem = (
      <Grid item xs={12} key={key}>
        <SurveyOption
          label={choice.ChoiceTitle}
          onClick={onChoiceClick(idx, choice, onClick)}
        />
      </Grid>
    );

    output.push(elem);
  });

  return output;
};

export function SurveySubmission(props) {
  return (
    <Grid container maxWidth="md" spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">
          {fromI10n('survey-submission.hello')}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5">{props.title}</Typography>
      </Grid>

      {buildChoices(props.choices, props.onClick)}
    </Grid>
  );
}

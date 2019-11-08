import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { FeedbackFormChoices } from './FeedbackFormChoices';

export const FeedbackFormQuestion = props => (
  <Grid item xs={12}>
    <Typography component="h3">{props.Question}</Typography>
    <FeedbackFormChoices
      Choices={props.Choices}
      value={props.value}
      handleChange={props.handleChange}
    />
  </Grid>
);

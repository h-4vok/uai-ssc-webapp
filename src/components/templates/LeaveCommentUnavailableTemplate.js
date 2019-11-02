import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import withLocalization from '../../localization/withLocalization';

const styles = () => ({
  center: {
    textAlign: 'center'
  }
});

const LeaveCommentUnavailableTemplateComponent = props => (
  <Container main maxWidth="md">
    <Grid container>
      <Grid item xs={12} className={props.classes.center}>
        <Typography variant="h3">
          {props.i10n['leave-comment.already-done-title']}
        </Typography>
        <Typography variant="h5">
          {props.i10n['leave-comment.already-done']}
        </Typography>
      </Grid>
    </Grid>
  </Container>
);

export const LeaveCommentUnavailableTemplate = withStyles(styles)(
  withLocalization(LeaveCommentUnavailableTemplateComponent)
);

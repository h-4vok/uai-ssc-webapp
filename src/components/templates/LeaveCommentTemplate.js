import React, { useState } from 'react';
import { Container, Grid, Box, Button } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import withLocalization from '../../localization/withLocalization';
import { SimpleTextField } from '../atoms';

function LeaveCommentTemplateComponent(props) {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');

  const handleRatingChange = event => setRating(event.target.value);
  const handleCommentChange = event => setComment(event.target.value);

  return (
    <Container main maxWidth="md">
      <Grid container>
        <Grid item xs={12}>
          {props.i10n['leave-comment.title']}
        </Grid>
        <Grid item xs={12}>
          <Box mt={3} mb={3}>
            <Grid item xs={3}>
              {props.i10n['leave-comment.rating']}
            </Grid>
            <Grid item xs={9}>
              <Container>
                <Rating value={rating} onChange={handleRatingChange} />
              </Container>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <SimpleTextField
            required
            maxLength="500"
            label={props.i10n['leave-comment.comment']}
            fullWidth
            multiline
            rowsMax="20"
            rows="6"
            value={comment}
            onChange={handleCommentChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Box mt={3}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => props.onConfirm(rating, comment)}
            >
              {props.i10n['global.confirm']}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export const LeaveCommentTemplate = withLocalization(
  LeaveCommentTemplateComponent
);

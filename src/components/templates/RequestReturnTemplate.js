import React from 'react';
import { Container, Typography, Grid, Button } from '@material-ui/core';
import { ButtonBar } from '../molecules';
import { fromI10n } from '../../lib/GlobalState';

export const RequestReturnTemplate = ({
  data: { ReceiptNumber, ItemDescription, TotalAmount },
  onCancel,
  onConfirm
}) => (
  <Container maxWidth="sm">
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography>
          {fromI10n('request-return.typography.are-you-sure')}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography style={{ fontWeight: 'bold' }}>
          {`${fromI10n(
            'request-return.typography.bill-row-header'
          )} ${ReceiptNumber}`}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <hr />
      </Grid>

      <Grid container item xs={12}>
        <Grid item xs={3}>
          Item: &nbsp;
        </Grid>
        <Grid item xs={9} style={{ fontWeight: 'bold' }}>
          {ItemDescription}
        </Grid>
        <Grid item xs={3}>
          Total: &nbsp;
        </Grid>
        <Grid item xs={9}>
          {TotalAmount}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <hr />
      </Grid>
      <Grid item xs={12}>
        <Typography>
          {fromI10n('request-return.typography.admin-notice')}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          {fromI10n('request-return.typography.expiration-date-notice')}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          {fromI10n('request-return.typography.credit-note-notice')}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ButtonBar centerItems>
          <Button variant="contained" color="primary" onClick={onCancel}>
            {fromI10n('global.action.cancel')}
          </Button>
          <Button variant="outlined" color="secondary" onClick={onConfirm}>
            {fromI10n('global.confirm')}
          </Button>
        </ButtonBar>
      </Grid>
    </Grid>
  </Container>
);

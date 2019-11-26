import React from 'react';
import { Grid, Container, Button, Typography } from '@material-ui/core';
import { ButtonBar } from '../molecules';
import { fromI10n } from '../../lib/GlobalState';
import './PrintChildCodesTemplate.scss';

export function PrintChildCodesTemplate({
  onBack,
  onPrint,
  expectedSamples,
  canGoBack,
  showButtonBar
}) {
  return (
    <Container maxWidth="lg">
      <Grid>
        {showButtonBar && (
          <Grid item xs={12}>
            <ButtonBar>
              {canGoBack && (
                <Button variant="outlined" color="secondary" onClick={onBack}>
                  {fromI10n('global.action.goback')}
                </Button>
              )}
              <Button variant="outlined" color="secondary" onClick={onPrint}>
                {fromI10n('global.action.print')}
              </Button>
            </ButtonBar>
          </Grid>
        )}
        {expectedSamples && (
          <Grid container>
            {expectedSamples.map(sample => (
              <Typography className="printable-barcode">
                {sample.ChildBarcode}
              </Typography>
            ))}
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

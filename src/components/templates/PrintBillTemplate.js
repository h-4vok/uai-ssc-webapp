import React from 'react';
import { Grid, Container, Button } from '@material-ui/core';
import { ButtonBar } from '../molecules';
import { PrintableBill } from '../organisms';
import { fromI10n } from '../../lib/GlobalState';

export function PrintBillTemplate({
  onBack,
  onPrint,
  receipt,
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
        <Grid
          item
          container
          xs={12}
          style={{ border: '1px solid black', marginBottom: 10 }}
        >
          {receipt && <PrintableBill receipt={receipt} />}
        </Grid>
      </Grid>
    </Container>
  );
}

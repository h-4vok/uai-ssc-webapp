import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { SimpleSelect } from '../atoms';
import { fromI10n } from '../../lib/GlobalState';

export const CreditNoteFormPayment = ({ creditNotes, onConfirm }) => {
  const [creditNoteValue, setCreditNote] = React.useState();

  const handleCreditNoteSelect = evt => {
    const { value } = evt.target;

    setCreditNote(value);
  };

  const getSelectedCreditNote = () => {
    return creditNotes.find(x => x.value === creditNoteValue);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SimpleSelect
          label={fromI10n('payment.credit-note-select')}
          fullWidth
          items={creditNotes}
          value={creditNoteValue}
          onChange={handleCreditNoteSelect}
        />
      </Grid>
      <Grid item xs={12}>
        {!!creditNotes.length && (
          <Button
            color="primary"
            variant="contained"
            disabled={!creditNoteValue}
            onClick={() => onConfirm(getSelectedCreditNote())}
          >
            {fromI10n('global.select')}
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

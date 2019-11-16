import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { SimpleSelect, SimpleTextField, FormControlCheckbox } from '../atoms';
import { fromI10n } from '../../lib/GlobalState';
import { handleNumericChange } from '../../operators';

const handleChange = setter => evt => setter(evt.target.value);

export function CreditCardFormPayment(props) {
  const [creditCard, setCreditCard] = React.useState(0);
  const [number, setNumber] = React.useState('');
  const [ccv, setCcv] = React.useState('');
  const [expirationDate, setExpirationDate] = React.useState('');
  const [holder, setHolder] = React.useState('');
  const [saveCard, setSaveCard] = React.useState(false);
  const [isSavedCard, setIsSavedCard] = React.useState(false);

  const handleChecked = evt => setSaveCard(evt.target.checked);
  const handleCardSelect = evt => {
    const { value } = evt.target;

    setIsSavedCard(value !== 0);

    setCreditCard(value);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SimpleSelect
          noEmpty
          label={fromI10n('payment.credit-card-select')}
          fullWidth
          items={props.creditCards}
          value={creditCard}
          onChange={handleCardSelect}
        />
      </Grid>

      {!isSavedCard && (
        <Grid item xs={9}>
          <SimpleTextField
            required
            maxLength="19"
            label={fromI10n('payment.credit-card-number')}
            fullWidth
            value={number}
            onChange={handleNumericChange(setNumber)}
          />
        </Grid>
      )}

      <Grid item xs={isSavedCard ? 12 : 3}>
        <SimpleTextField
          required
          maxLength="4"
          label={fromI10n('payment.credit-card-ccv')}
          fullWidth
          value={ccv}
          onChange={handleNumericChange(setCcv)}
        />
      </Grid>

      {!isSavedCard && (
        <>
          <Grid item xs={6}>
            <SimpleTextField
              required
              maxLength="4"
              label={fromI10n('payment.credit-card-expiration')}
              fullWidth
              value={expirationDate}
              onChange={handleNumericChange(setExpirationDate)}
            />
          </Grid>
          <Grid item xs={6} />

          <Grid item xs={12}>
            <SimpleTextField
              required
              maxLength="100"
              label={fromI10n('payment.credit-card-holder')}
              fullWidth
              value={holder}
              onChange={handleChange(setHolder)}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlCheckbox
              value="saveCard"
              checked={saveCard}
              onChange={handleChecked}
              label={fromI10n('payment.save-credit-card')}
            />
          </Grid>
        </>
      )}

      <Grid item xs={12}>
        <Button color="primary" variant="contained" onClick={props.onConfirm}>
          {fromI10n('global.select')}
        </Button>
      </Grid>
    </Grid>
  );
}

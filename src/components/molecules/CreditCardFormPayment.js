import React from 'react';
import { Grid, Button } from '@material-ui/core';
import {
  SimpleSelect,
  SimpleTextField,
  FormControlCheckbox,
  CreditCardGenericIcon,
  CreditCardVisaIcon,
  CreditCardMasterCardIcon,
  CreditCardAmexIcon,
  CreditCardShowoff
} from '../atoms';
import { fromI10n } from '../../lib/GlobalState';
import { handleNumericChange, identifyCreditCardIssuer } from '../../operators';

const handleChange = setter => evt => setter(evt.target.value);

const creditCardIcons = {
  generic: <CreditCardGenericIcon width="48" height="48" />,
  visa: <CreditCardVisaIcon width="48" height="48" />,
  amex: <CreditCardAmexIcon width="48" height="48" />,
  mastercard: <CreditCardMasterCardIcon width="48" height="48" />
};

const maxCardLength = {
  amex: '15',
  mastercard: '16',
  visa: '16',
  generic: '19'
};

const maxCvcLength = {
  amex: '4',
  mastercard: '3',
  visa: '3',
  generic: '4'
};

export function CreditCardFormPayment(props) {
  const [creditCard, setCreditCard] = React.useState(0);
  const [creditCardIcon, setCreditCardIcon] = React.useState('generic');
  const [number, setNumber] = React.useState('');
  const [ccv, setCcv] = React.useState('');
  const [expirationDate, setExpirationDate] = React.useState('');
  const [holder, setHolder] = React.useState('');
  const [saveCard, setSaveCard] = React.useState(false);
  const [isSavedCard, setIsSavedCard] = React.useState(false);
  const [focused, setFocused] = React.useState('');

  const handleChecked = evt => setSaveCard(evt.target.checked);
  const handleCardSelect = evt => {
    const { value } = evt.target;

    setIsSavedCard(value !== 0);

    setCreditCard(value);

    const currentCard = props.creditCards.find(c => c.value === value);
    let issuer = 'generic';

    if (currentCard && currentCard.CreditCard) {
      issuer = identifyCreditCardIssuer(currentCard.CreditCard.Number);
    }

    setCreditCardIcon(issuer);
  };

  const numberCardAccepted = value => {
    const issuer = identifyCreditCardIssuer(value);
    setCreditCardIcon(issuer);
    setNumber(value);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={1}>
        {creditCardIcons[creditCardIcon]}
      </Grid>
      <Grid item xs={11}>
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
        <Grid item xs={12}>
          <CreditCardShowoff
            number={number || ''}
            name={holder || ''}
            expiry={expirationDate || ''}
            cvc={ccv || ''}
            focused={focused}
            issuer={creditCardIcon}
          />
        </Grid>
      )}

      {!isSavedCard && (
        <Grid item xs={9}>
          <SimpleTextField
            required
            maxLength={maxCardLength[creditCardIcon]}
            label={fromI10n('payment.credit-card-number')}
            fullWidth
            value={number}
            onChange={handleNumericChange(numberCardAccepted)}
          />
        </Grid>
      )}

      <Grid item xs={isSavedCard ? 12 : 3}>
        <SimpleTextField
          required
          maxLength={maxCvcLength[creditCardIcon]}
          label={fromI10n('payment.credit-card-ccv')}
          fullWidth
          value={ccv}
          onChange={handleNumericChange(setCcv)}
          onBlur={() => setFocused('')}
          onFocus={() => setFocused('cvc')}
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

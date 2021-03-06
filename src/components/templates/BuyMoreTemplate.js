import React, { PureComponent } from 'react';
import { Container, Typography, Grid, Box, Button } from '@material-ui/core';
import { PriceSelectionCard } from '../molecules';
import {
  PaymentMethodsTabs,
  EstablishedPaymentMethods,
  PurchaseBillDetail
} from '../organisms';
import withLocalization from '../../localization/withLocalization';
import './BuyMoreTemplate.scss';

class BuyMoreTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedPrice: null,
      selectedCard: null
    };
  }

  onPriceSelection = (code, price, cardValue) => {
    this.setState({
      selectedPrice: { code, price },
      selectedCard: cardValue
    });
  };

  formatPrice = price => `U$D ${price}.00`;

  render() {
    const {
      model,
      prices,
      i10n,
      onCreditCardConfirm,
      onCreditNoteConfirm,
      creditCards,
      creditNotes,
      establishedPaymentMethods,
      onDeletePaymentMethod,
      showCreditCard,
      showCreditNotes,
      onBuyConfirm
    } = this.props;
    const { selectedPrice, selectedCard } = this.state;

    return (
      <Container maxWidth="md">
        <Box className="your-plan-box">
          <Typography variant="h5">
            {i10n['client-landing.your-plan']}
          </Typography>
          <Typography variant="h3">{model.ServicePlanName}</Typography>
        </Box>
        <Grid container>
          {(!establishedPaymentMethods ||
            !establishedPaymentMethods.length) && (
            <Grid item xs={6}>
              <PriceSelectionCard
                title={i10n['buy-more.months']}
                priceFormatted={this.formatPrice(prices.Month.Price)}
                onClick={() =>
                  this.onPriceSelection(
                    prices.Month.Code,
                    prices.Month.Price,
                    'Month'
                  )
                }
                selected={selectedCard === 'Month'}
              />
            </Grid>
          )}
          {(!establishedPaymentMethods ||
            !establishedPaymentMethods.length) && (
            <Grid item xs={6}>
              <PriceSelectionCard
                title={i10n['buy-more.years']}
                priceFormatted={this.formatPrice(prices.Year.Price)}
                onClick={() =>
                  this.onPriceSelection(
                    prices.Year.Code,
                    prices.Year.Price,
                    'Year'
                  )
                }
                selected={selectedCard === 'Year'}
              />
            </Grid>
          )}
          {selectedPrice && (
            <Grid item xs={12}>
              <PurchaseBillDetail
                selectedPurchase={selectedPrice}
                servicePlanName={model.ServicePlanName}
                isAnualBuy={selectedCard === 'Year'}
              />
            </Grid>
          )}
          {selectedPrice && (
            <PaymentMethodsTabs
              creditCards={creditCards}
              creditNotes={creditNotes}
              onCreditCardConfirm={onCreditCardConfirm}
              onCreditNoteConfirm={onCreditNoteConfirm}
              showCreditCard={showCreditCard}
              showCreditNotes={showCreditNotes}
            />
          )}
          <Grid item xs={12}>
            {establishedPaymentMethods &&
              !!establishedPaymentMethods.length && (
                <EstablishedPaymentMethods
                  currentPriceToPay={selectedPrice.price}
                  paymentMethods={establishedPaymentMethods}
                  onDeletePaymentMethod={onDeletePaymentMethod}
                />
              )}
          </Grid>
          <Grid item xs={12}>
            {establishedPaymentMethods && !!establishedPaymentMethods.length && (
              <Box m={4}>
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  onClick={() => onBuyConfirm(selectedPrice)}
                >
                  {i10n['global.confirm']}
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export const BuyMoreTemplate = withLocalization(BuyMoreTemplateComponent);

import React, { PureComponent } from 'react';
import { Container, Typography, Grid, Box, Button } from '@material-ui/core';
import { PriceSelectionCard } from '../molecules';
import { PaymentMethodsTabs, EstablishedPaymentMethods } from '../organisms';
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
      creditCards,
      establishedPaymentMethods,
      onDeletePaymentMethod,
      showCreditCard,
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
          {selectedPrice && (
            <PaymentMethodsTabs
              creditCards={creditCards}
              onConfirm={onCreditCardConfirm}
              showCreditCard={showCreditCard}
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
              <Button
                color="primary"
                variant="contained"
                fullWidth
                onClick={() => onBuyConfirm(selectedPrice)}
              >
                {i10n['global.confirm']}
              </Button>
            )}
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export const BuyMoreTemplate = withLocalization(BuyMoreTemplateComponent);

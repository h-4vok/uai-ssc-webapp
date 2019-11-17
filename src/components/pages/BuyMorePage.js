import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';
import { PlatformPageLayout } from '../organisms';
import { BuyMoreTemplate } from '../templates';

class BuyMorePageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);

    this.state = {
      model: null,
      prices: null,
      creditCards: null,
      paymentMethods: [],
      showCreditCard: true
    };
  }

  componentDidMount() {
    this.loadLandingData();
    this.loadPrices();
    this.loadCreditCards();
  }

  loadLandingData = () => {
    this.api.request
      .get('clientmanagement')
      .success(({ body: { Result: model } }) => this.setState({ model }))
      .go();
  };

  loadPrices = () => {
    this.api.request
      .get('clientmanagement/selectableprices')
      .success(({ body: { Result: prices } }) => this.setState({ prices }))
      .go();
  };

  loadCreditCards = () => {
    this.api.request
      .get('clientmanagement/selectableCreditCards')
      .success(({ body: { Result: creditCards } }) =>
        this.setState({ creditCards })
      )
      .go();
  };

  onCreditCardConfirm = (newCard, callback, saveCard) => {
    this.weAreSavingCard = saveCard;

    this.api.request
      .post('clientmanagement/validateCreditCard', newCard)
      .preventSpinner()
      .preventDefaultSuccess()
      .success(() => {
        this.setState(prevState => ({
          paymentMethods: [...prevState.paymentMethods, newCard],
          showCreditCard: false
        }));
      })
      .success(callback)
      .go();
  };

  onDeletePaymentMethod = itemToDelete => {
    const isCreditCard = itemToDelete.ReferenceModel.CCV;

    this.setState(prevState => ({
      paymentMethods: prevState.paymentMethods.filter(
        item => itemToDelete.ReferenceModel !== item
      ),
      showCreditCard: isCreditCard
    }));
  };

  onBuyConfirm = selectedPrice => {
    // Figure out some values
    const soleCreditCard = this.state.paymentMethods.find(x => !!x.CCV);

    const saveCard =
      this.weAreSavingCard && !!soleCreditCard && !soleCreditCard.Id;

    const isAnualBuy = this.state.prices.Year.Price === selectedPrice.price;

    const body = {
      CreditCard: soleCreditCard,
      SaveCard: saveCard,
      CreditNotes: [],
      PricingPlanCode: selectedPrice.code,
      isAnualBuy,
      IncomingHost: `${window.location.hostname}:${window.location.port}`
    };

    this.api.request
      .post('clientmanagement/buy', body)
      .success(() => this.props.history.push('/client-landing'))
      .go();
  };

  render() {
    const {
      model,
      prices,
      creditCards,
      paymentMethods,
      showCreditCard
    } = this.state;

    return (
      <PlatformPageLayout>
        {model && prices && (
          <BuyMoreTemplate
            model={model}
            creditCards={creditCards}
            prices={prices}
            onCreditCardConfirm={this.onCreditCardConfirm}
            establishedPaymentMethods={paymentMethods}
            onDeletePaymentMethod={this.onDeletePaymentMethod}
            showCreditCard={showCreditCard}
            onBuyConfirm={this.onBuyConfirm}
          />
        )}
      </PlatformPageLayout>
    );
  }
}

export const BuyMorePage = withSnackbar(BuyMorePageComponent);

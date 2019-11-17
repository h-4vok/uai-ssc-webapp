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

  onCreditCardConfirm = (newCard, callback) => {
    this.api.request
      .post('clientmanagement/validateCreditCard', newCard)
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

  onBuyConfirm = () => {
    console.log('hasta aca llegamos');
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

import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';
import { PlatformPageLayout } from '../organisms';
import { BuyMoreTemplate } from '../templates';
import { fromI10n } from '../../lib/GlobalState';

class BuyMorePageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);

    this.state = {
      model: null,
      prices: null,
      creditCards: null,
      creditNotes: null,
      paymentMethods: [],
      showCreditCard: true,
      showCreditNotes: true
    };
  }

  componentDidMount() {
    this.loadLandingData();
    this.loadPrices();
    this.loadCreditCards();
    this.loadCreditNotes();
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

  loadCreditNotes = () => {
    this.api.request
      .get('clientmanagement/selectableCreditNotes')
      .success(({ body: { Result: creditNotes } }) =>
        this.setState({ creditNotes })
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

  onCreditNoteConfirm = newCreditNote => {
    const noteExists = this.state.paymentMethods.some(
      x => x.CreditNoteNumber === newCreditNote.CreditNoteNumber
    );

    if (noteExists) {
      this.notifier.warning(
        fromI10n('payment-methods.credit-note-already-selected')
      );
      return;
    }

    this.setState(
      prevState => ({
        paymentMethods: [...prevState.paymentMethods, newCreditNote],
        creditNotes: prevState.creditNotes.filter(x => x !== newCreditNote),
        showCreditNotes: false
      }),
      () => this.setState({ showCreditNotes: true })
    );
  };

  onDeletePaymentMethod = itemToDelete => {
    const isCreditCard = itemToDelete.ReferenceModel.CCV;
    const resolveCreditNotes = prevState => {
      if (isCreditCard) return prevState.creditNotes;

      prevState.creditNotes.push(itemToDelete.ReferenceModel);
      return prevState.creditNotes;
    };

    if (isCreditCard) {
      this.setState(prevState => ({
        paymentMethods: prevState.paymentMethods.filter(
          item => itemToDelete.ReferenceModel !== item
        ),
        showCreditCard: isCreditCard
      }));
    } else {
      this.setState(prevState => ({
        paymentMethods: prevState.paymentMethods.filter(
          item => itemToDelete.ReferenceModel !== item
        ),
        creditNotes: resolveCreditNotes(prevState)
      }));
    }
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
      CreditNotes: this.state.paymentMethods.filter(x => !x.CCV),
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
      creditNotes,
      paymentMethods,
      showCreditCard,
      showCreditNotes
    } = this.state;

    return (
      <PlatformPageLayout>
        {model && prices && (
          <BuyMoreTemplate
            model={model}
            creditCards={creditCards}
            creditNotes={creditNotes}
            prices={prices}
            onCreditCardConfirm={this.onCreditCardConfirm}
            onCreditNoteConfirm={this.onCreditNoteConfirm}
            establishedPaymentMethods={paymentMethods}
            onDeletePaymentMethod={this.onDeletePaymentMethod}
            showCreditCard={showCreditCard}
            showCreditNotes={showCreditNotes}
            onBuyConfirm={this.onBuyConfirm}
          />
        )}
      </PlatformPageLayout>
    );
  }
}

export const BuyMorePage = withSnackbar(BuyMorePageComponent);

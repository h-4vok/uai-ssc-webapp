import React, { PureComponent } from 'react';
import { Container, Grid } from '@material-ui/core';
import { PricingCard } from '../molecules/PricingCard';
import { SingleItemSessionStorage } from '../../lib/SingleItemSessionStorage';
import { SignUpStorageKey } from '../../content/StorageKeys';
import { SignUpDataModel } from '../../models';
import withLocalization from '../../localization/withLocalization';

const startNewSignUp = history => pricingPlan => {
  const model = new SignUpDataModel();
  model.pricingPlan = pricingPlan;

  const storage = new SingleItemSessionStorage(SignUpStorageKey);
  storage.set(model);

  history.push('/sign-up--initial');
};

const continueSignUp = (history, model) => pricingPlan => {
  model.pricingPlan = pricingPlan;

  const storage = new SingleItemSessionStorage(SignUpStorageKey);
  storage.set(model);

  history.push('/sign-up--payment-data');
};

class PricingChartComponent extends PureComponent {
  buildOnePricingCard = (i10n, descriptor, buttonVariant = '') => ({
    title: i10n[`pricing-plan.${descriptor}.title`],
    code: descriptor,
    subheader: i10n[`pricing-plan.${descriptor}.subheader`],
    price: i10n[`pricing-plan.${descriptor}.price`],
    billFrequency: i10n[`pricing-plan.${descriptor}.billFrequency`],
    planDescription: i10n[`pricing-plan.${descriptor}.planDescription`],
    patientSamplesDescription:
      i10n[`pricing-plan.${descriptor}.patientSamplesDescription`],
    controlSamplesDescription:
      i10n[`pricing-plan.${descriptor}.controlSamplesDescription`],
    userAccountsDescription:
      i10n[`pricing-plan.${descriptor}.userAccountsDescription`],
    runExecutionsDescription:
      i10n[`pricing-plan.${descriptor}.runExecutionsDescription`],
    signUpDescription: i10n[`pricing-plan.${descriptor}.signUpDescription`],
    buttonVariant
  });

  buildPricingCards = i10n => [
    this.buildOnePricingCard(i10n, 'free'),
    this.buildOnePricingCard(i10n, 'premium', 'contained'),
    this.buildOnePricingCard(i10n, 'corporate')
  ];

  render() {
    const { history, model, isSignUp, i10n } = this.props;

    let onSelection = null;
    if (isSignUp) {
      onSelection = code => continueSignUp(history, model)(code);
    } else {
      onSelection = code => startNewSignUp(history)(code);
    }

    const pricingCards = this.buildPricingCards(i10n);

    return (
      <>
        <Container maxWidth="lg" component="main">
          <Grid
            container
            spacing={5}
            alignItems="flex-end"
            className="pricing-chart"
          >
            {pricingCards.map(item => (
              <Grid item key={item.title} xs={12} md={4}>
                <PricingCard
                  {...item}
                  onSelection={() => onSelection(item.code)}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </>
    );
  }
}

export const PricingChart = withLocalization(PricingChartComponent);

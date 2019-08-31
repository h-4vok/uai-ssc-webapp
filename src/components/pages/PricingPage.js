import React, { PureComponent } from 'react';
import { SingleItemSessionStorage } from '../../lib/SingleItemSessionStorage';
import { PricingChart, PageLayout } from '../organisms';

export class PricingPage extends PureComponent {
  storage = new SingleItemSessionStorage('sign-up-data');

  render() {
    return (
      <PageLayout>
        <PricingChart />
      </PageLayout>
    );
  }
}

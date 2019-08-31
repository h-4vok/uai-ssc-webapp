import React, { PureComponent } from 'react';
import { SingleItemSessionStorage } from '../../lib/SingleItemSessionStorage';
import { PricingChart, PageLayout } from '../organisms';

export class PricingPage extends PureComponent {
  storage = new SingleItemSessionStorage('sign-up-data');

  render() {
    const { history } = this.props;

    return (
      <PageLayout>
        <PricingChart history={history} />
      </PageLayout>
    );
  }
}

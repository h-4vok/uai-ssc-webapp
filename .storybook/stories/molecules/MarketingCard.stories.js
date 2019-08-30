import React from 'react';

import { storiesWithRouterOf } from '../../storiesWithRouterOf';
import { MarketingCard } from '../../../src/components/molecules';

storiesWithRouterOf('molecules/MarketingCard')
  .add('Empty', () => <MarketingCard />)
  .add('With text', () => (
    <MarketingCard upperText="Upper text" title="Title of card">
      The description is the props.children of the element.
    </MarketingCard>
  ));

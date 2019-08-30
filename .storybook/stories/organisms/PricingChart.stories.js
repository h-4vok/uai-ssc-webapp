import React from 'react';

import { storiesWithRouterOf } from '../../storiesWithRouterOf';
import { PricingChart } from '../../../src/components/organisms';

storiesWithRouterOf('organisms/PricingChart').add('Home', () => (
  <PricingChart />
));

import React from 'react';

import { storiesWithRouterOf } from '../../storiesWithRouterOf';
import { ApplicationBar } from '../../../src/components/molecules';

storiesWithRouterOf('molecules/ApplicationBar').add('Default', () => (
  <ApplicationBar />
));

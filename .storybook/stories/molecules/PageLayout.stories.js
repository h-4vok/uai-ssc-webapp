import React from 'react';

import { storiesWithRouterOf } from '../../storiesWithRouterOf';
import { PageLayout } from '../../../src/components/organisms';

storiesWithRouterOf('organisms/PageLayout').add('Default', () => (
  <PageLayout>
    <div style={{ height: '150px' }}>This is a div with some text</div>
  </PageLayout>
));

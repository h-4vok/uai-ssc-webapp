import React from 'react';

import { storiesOf } from '@storybook/react';
import { PageLayout } from '../../../src/components/molecules';

storiesOf('molecules/PageLayout').add('Default', () => (
  <PageLayout>
    <div>This is a div with some text</div>
  </PageLayout>
));

import React from 'react';

import { storiesOf } from '@storybook/react';
import { PasswordRequirementsBox } from '../../../src/components/atoms/PasswordRequirementsBox';

storiesOf('atoms/PasswordRequirementsBox').add('Default', () => (
  <PasswordRequirementsBox />
));

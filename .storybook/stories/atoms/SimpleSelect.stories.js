import React from 'react';

import { storiesOf } from '@storybook/react';
import { SimpleSelect } from '../../../src/components/atoms';

const buildItem = value => ({ value, label: `Item ${value}` });

const defaultItems = [1, 2, 3, 4, 5].map(buildItem);

storiesOf('atoms/SimpleSelect')
  .add('Default', () => <SimpleSelect items={defaultItems} />)
  .add('With selected value', () => (
    <SimpleSelect value="1" items={defaultItems} />
  ));

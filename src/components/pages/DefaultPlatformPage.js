import React from 'react';
import { PlatformPageLayout } from '../organisms';

export const DefaultPlatformPage = props => (
  <PlatformPageLayout history={props.history}>
    <div styles="text:align: center;">
      This is an empty page. Development is pending
    </div>
  </PlatformPageLayout>
);

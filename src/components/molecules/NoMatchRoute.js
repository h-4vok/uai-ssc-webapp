import React from 'react';
import { PageLayout } from '../organisms';

export const NoMatchRoute = ({ location }) => (
  <PageLayout>
    <div>
      <p>
        Ningún resultado para <code>{location.pathname}</code>
      </p>
    </div>
  </PageLayout>
);

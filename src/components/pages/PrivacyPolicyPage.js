import React from 'react';
import { withSnackbar } from 'notistack';
import { PageLayout } from '../organisms';
import { PrivacyPolicyTemplate } from '../templates';

const PrivacyPolicyPageComponent = () => (
  <PageLayout>
    <PrivacyPolicyTemplate />
  </PageLayout>
);

export const PrivacyPolicyPage = withSnackbar(PrivacyPolicyPageComponent);

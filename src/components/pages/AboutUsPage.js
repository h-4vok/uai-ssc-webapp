import React from 'react';
import { withSnackbar } from 'notistack';
import { PageLayout } from '../organisms';
import { AboutUsTemplate } from '../templates';

const AboutUsPageComponent = () => (
  <PageLayout>
    <AboutUsTemplate />
  </PageLayout>
);

export const AboutUsPage = withSnackbar(AboutUsPageComponent);

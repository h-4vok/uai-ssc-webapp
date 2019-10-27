import React from 'react';
import { withSnackbar } from 'notistack';
import { PageLayout } from '../organisms';
import { ContactUsTemplate } from '../templates';

const ContactUsPageComponent = () => (
  <PageLayout>
    <ContactUsTemplate />
  </PageLayout>
);

export const ContactUsPage = withSnackbar(ContactUsPageComponent);

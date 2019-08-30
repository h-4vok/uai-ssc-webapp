import React from 'react';

import { storiesWithRouterOf } from '../../storiesWithRouterOf';
import { PricingCard } from '../../../src/components/molecules';

const freePlan = {
  title: 'Gratuito',
  subheader: 'Para laboratorios pequeños o probar la plataforma',
  price: '$0',
  billFrequency: '',
  patientSamplesDescription: 'Hasta 1000 muestras de pacientes',
  controlSamplesDescription: 'Hasta 1000 muestras de control',
  userAccountsDescription: 'Hasta 5 cuentas de usuario',
  runExecutionsDescription: 'Hasta 10 ensayos clinicos por mes',
  signUpDescription: 'Utilizar gratuitamente'
};

storiesWithRouterOf('molecules/PricingCard').add('Free', () => (
  <PricingCard {...freePlan} />
));

import React from 'react';
import { Container, Grid } from '@material-ui/core';
import { PricingCard } from '../molecules/PricingCard';

const pricingCards = [
  {
    title: 'Gratuito',
    subheader: 'Para laboratorios pequeños o probar la plataforma',
    price: 0,
    billFrequency: '',
    patientSamplesDescription: 'Hasta 1000 muestras de pacientes',
    controlSamplesDescription: 'Hasta 1000 muestras de control',
    userAccountsDescription: 'Hasta 5 cuentas de usuario',
    runExecutionsDescription: 'Hasta 10 ensayos clinicos por mes',
    signUpDescription: 'Utilizar gratuitamente'
  },
  {
    title: 'Premium',
    subheader: 'Para laboratorios medianos',
    price: 0,
    billFrequency: '',
    patientSamplesDescription: 'Hasta 1000 muestras de pacientes',
    controlSamplesDescription: 'Hasta 1000 muestras de control',
    userAccountsDescription: 'Hasta 5 cuentas de usuario',
    runExecutionsDescription: 'Hasta 10 ensayos clinicos por mes',
    signUpDescription: 'Utilizar gratuitamente'
  },
  {
    title: 'Corporativo',
    subheader: 'Para laboratorios pequeños o probar la plataforma',
    price: 0,
    billFrequency: '',
    patientSamplesDescription: 'Hasta 1000 muestras de pacientes',
    controlSamplesDescription: 'Hasta 1000 muestras de control',
    userAccountsDescription: 'Hasta 5 cuentas de usuario',
    runExecutionsDescription: 'Hasta 10 ensayos clinicos por mes',
    signUpDescription: 'Utilizar gratuitamente'
  }
];

export const PricingChart = () => (
  <>
    <Container maxWidth="lg" component="main">
      <Grid
        container
        spacing={5}
        alignItems="flex-end"
        className="pricing-chart"
      >
        <Grid item key="free" xs={12} md={4}>
          {pricingCards.map(item => (
            <PricingCard {...item} />
          ))}
        </Grid>
      </Grid>
    </Container>
  </>
);

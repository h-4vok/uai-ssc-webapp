import React from 'react';
import { Container, Grid } from '@material-ui/core';
import { PricingCard } from '../molecules/PricingCard';

const pricingCards = [
  {
    title: 'Gratuito',
    subheader: 'Para probar la plataforma',
    price: 'USD 0',
    billFrequency: '/mes',
    planDescription: 'Suscripción gratuita para probar',
    patientSamplesDescription: 'Hasta 1000 muestras de pacientes',
    controlSamplesDescription: 'Hasta 1000 muestras de control',
    userAccountsDescription: 'Hasta 5 cuentas de usuario',
    runExecutionsDescription: 'Hasta 10 ensayos clinicos por mes',
    signUpDescription: 'Probar la plataforma'
  },
  {
    title: 'Premium',
    subheader: 'Para laboratorios pequeños y medianos',
    price: 'USD 17.500',
    billFrequency: '/mes',
    planDescription: 'Suscripción mensual o anual (con descuento)',
    patientSamplesDescription: 'Hasta 5000 muestras de pacientes por mes',
    controlSamplesDescription: 'Hasta 5000 muestras de control por mes',
    userAccountsDescription: 'Hasta 50 cuentas de usuario',
    runExecutionsDescription: 'Sin límite de ensayos clínicos',
    signUpDescription: 'Comenzar a operar',
    buttonVariant: 'contained'
  },
  {
    title: 'Corporativo',
    subheader: 'La solución completa de SSC',
    price: 'USD 50.000',
    billFrequency: '/mes',
    planDescription: 'Suscripción mensual o anual (con descuento)',
    patientSamplesDescription: 'Sin límite de muestras de pacientes',
    controlSamplesDescription: 'Sin límite de muestras de control',
    userAccountsDescription: 'Sin límite de cuentas de usuario',
    runExecutionsDescription: 'Sin límite de ensayos clínicos',
    signUpDescription: 'Operatoria profesional'
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
        {pricingCards.map(item => (
          <Grid item key={item.title} xs={12} md={4}>
            <PricingCard {...item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  </>
);

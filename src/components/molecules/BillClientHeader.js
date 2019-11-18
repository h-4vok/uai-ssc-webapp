import React from 'react';
import { Grid, Typography, Box } from '@material-ui/core';
import './BillClientHeader.scss';

const TypeWithCheck = ({ label, checked }) => (
  <>
    <Grid container>
      <Grid item xs={6}>
        <Typography>{label}:</Typography>
      </Grid>
      <Grid item xs={6} style={{ textAlign: 'center', fontWeight: 'bold' }}>
        <Box className="coso-box">
          {checked && <Typography>X</Typography>}
          {!checked && <Typography>&nbsp;</Typography>}
        </Box>
      </Grid>
    </Grid>
  </>
);

export const BillClientHeader = ({
  ClientLegalName,
  ClientCompositeAddress,
  ClientTaxCode,
  IsCreditCardSale,
  IsCreditNoteSale
}) => (
  <>
    <Grid container className="bill-client-header-container">
      <Grid item xs={2}>
        <Typography style={{ fontWeight: 'bold' }}>Señor/es:</Typography>
        <Typography style={{ fontWeight: 'bold' }}>Domicilio:</Typography>
        <Typography style={{ fontWeight: 'bold' }}>CUIT:</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>{ClientLegalName}</Typography>
        <Typography>{ClientCompositeAddress}</Typography>
        <Typography>{ClientTaxCode}</Typography>
      </Grid>
      <Grid item xs={2}>
        <TypeWithCheck label="R.I." checked />
        <TypeWithCheck label="C.F." />
        <TypeWithCheck label="MONOT." />
      </Grid>
      <Grid item xs={2}>
        <TypeWithCheck label="N.R." />
        <TypeWithCheck label="Exento" />
      </Grid>
    </Grid>
    <Grid container className="bill-client-payment-type">
      <Grid item xs={8}>
        Condiciones de Venta
      </Grid>
      <Grid item xs={4}>
        Moneda: U$D
      </Grid>
    </Grid>
    <Grid
      className="bill-client-payment-type"
      container
      direction="row"
      justify="center"
      alignItems="flex-start"
    >
      <Box className="payment-method-box-title">Contado</Box>
      <Box className="payment-method-box-value">&nbsp;&nbsp;</Box>

      <Box className="payment-method-box-title">Cta. Cte.</Box>
      <Box className="payment-method-box-value">&nbsp;&nbsp;</Box>

      <Box className="payment-method-box-title">Tarjeta de Crédito</Box>
      <Box className="payment-method-box-value">
        {IsCreditCardSale ? 'X' : ' '}&nbsp;
      </Box>

      <Box className="payment-method-box-title">Nota de Crédito</Box>
      <Box className="payment-method-box-value">
        {IsCreditNoteSale ? 'X' : ' '}&nbsp;
      </Box>

      <Box className="payment-method-box-title">Otros</Box>
      <Box className="payment-method-box-value">&nbsp;&nbsp;</Box>
    </Grid>
  </>
);

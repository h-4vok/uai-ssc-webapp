import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import './BillHeader.scss';

export const BillHeader = ({ ReceiptNumber, FormattedTransactionDate }) => (
  <>
    <Grid
      item
      xs={5}
      className="bill-header-div-padding"
      style={{ textAlign: 'center' }}
    >
      <Typography variant="h5">Sample Supply Chain</Typography>
      <Typography className="bill-from-havok">
        De Havok International S.A.
      </Typography>
    </Grid>
    <Grid item xs={2} className="bill-letter" style={{ textAlign: 'center' }}>
      A
    </Grid>
    <Grid
      className="bill-header-div-padding"
      item
      xs={5}
      style={{ textAlign: 'right' }}
    >
      <Typography variant="h5">ORIGINAL</Typography>
      <Typography>FACTURA</Typography>
    </Grid>

    <Grid
      item
      xs={5}
      className="bill-header-div-padding"
      style={{ textAlign: 'center' }}
    >
      <Typography>Av. Paseo Colón 524, CP 1063, CABA, Argentina</Typography>
      <Typography>IVA Responsable Inscripto</Typography>
    </Grid>

    <Grid item xs={2}>
      &nbsp;
    </Grid>

    <Grid
      item
      xs={5}
      className="bill-header-div-padding"
      style={{ textAlign: 'right' }}
    >
      <Grid container>
        <Grid item xs={5}>
          Número:
        </Grid>
        <Grid item xs={7}>
          {ReceiptNumber}
        </Grid>
        <Grid item xs={5}>
          Fecha:
        </Grid>
        <Grid item xs={7}>
          {FormattedTransactionDate}
        </Grid>
        <Grid item xs={5}>
          CUIT:
        </Grid>
        <Grid item xs={7}>
          33-71114625-9
        </Grid>
        <Grid item xs={5}>
          Inicio de Actividades:
        </Grid>
        <Grid item xs={7}>
          {'03/2019'}
        </Grid>
      </Grid>
    </Grid>
  </>
);

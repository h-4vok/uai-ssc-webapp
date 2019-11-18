import React from 'react';
import { Grid } from '@material-ui/core';
import './BillProductDetail.scss';

const DetailLine = ({
  Quantity,
  Detail,
  FormattedUnitPrice,
  FormattedTotalPrice
}) => (
  <>
    <Grid item xs={2} className="bill-product-detail-data-box centered-header">
      {Quantity}
    </Grid>
    <Grid item xs={6} className="bill-product-detail-data-box">
      {Detail}
    </Grid>
    <Grid item xs={2} className="bill-product-detail-data-box centered-header">
      {FormattedUnitPrice}
    </Grid>
    <Grid
      item
      xs={2}
      className="bill-product-detail-data-box-last centered-header"
    >
      {FormattedTotalPrice}
    </Grid>
  </>
);

const BillTotals = ({ FormattedSubtotal, FormattedVAT, FormattedTotal }) => (
  <>
    <Grid container>
      <Grid item xs={8} className="bill-totals-row-box">
        &nbsp;
      </Grid>
      <Grid item xs={2} className="bill-totals-title-box">
        Subtotal
      </Grid>
      <Grid item xs={2} className="bill-totals-value centered-header">
        {FormattedSubtotal}
      </Grid>
      <Grid item xs={8} className="bill-totals-row-box">
        &nbsp;
      </Grid>
      <Grid item xs={2} className="bill-totals-title-box">
        IVA
      </Grid>
      <Grid item xs={2} className="bill-totals-value centered-header">
        {FormattedVAT}
      </Grid>
      <Grid item xs={8} className="bill-totals-title-box">
        &nbsp;
      </Grid>
      <Grid item xs={2} className="bill-totals-title-box">
        Total
      </Grid>
      <Grid item xs={2} className="bill-totals-value centered-header">
        {FormattedTotal}
      </Grid>
    </Grid>
  </>
);

const Footer = () => (
  <>
    <Grid container>
      <Grid item xs={9}>
        &nbsp;
      </Grid>
      <Grid item xs={3} style={{ padding: '10px 20px' }}>
        CAI N° 30000000000000
      </Grid>
      <Grid item xs={9}>
        &nbsp;
      </Grid>
      <Grid item xs={3} style={{ padding: '10px 20px' }}>
        Fecha Vto CAI 01/01/2021
      </Grid>
    </Grid>
  </>
);

const fillLines = lines => {
  while (lines.length < 5) {
    lines.push({});
  }
  return lines;
};

export const BillProductDetail = ({
  Lines,
  FormattedSubtotal,
  FormattedVAT,
  FormattedTotal
}) => (
  <>
    <Grid container>
      <Grid
        item
        xs={2}
        className="bill-product-detail-data-box centered-header"
      >
        Cantidad
      </Grid>
      <Grid item xs={6} className="bill-product-detail-data-box">
        Detalle
      </Grid>
      <Grid
        item
        xs={2}
        className="bill-product-detail-data-box centered-header"
      >
        P. Unitario
      </Grid>
      <Grid
        item
        xs={2}
        className="bill-product-detail-data-box-last centered-header"
      >
        Importe
      </Grid>
      {fillLines(Lines).map(
        ({ Quantity, Detail, FormattedUnitPrice, FormattedTotalPrice }) => (
          <DetailLine
            Quantity={Quantity}
            Detail={Detail}
            FormattedUnitPrice={FormattedUnitPrice}
            FormattedTotalPrice={FormattedTotalPrice}
          />
        )
      )}
      <BillTotals
        FormattedSubtotal={FormattedSubtotal}
        FormattedVAT={FormattedVAT}
        FormattedTotal={FormattedTotal}
      />
      <Footer />
    </Grid>
  </>
);

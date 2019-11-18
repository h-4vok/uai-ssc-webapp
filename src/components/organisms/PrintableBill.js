import React from 'react';
import { BillHeader, BillClientHeader, BillProductDetail } from '../molecules';

export const PrintableBill = ({ receipt }) => (
  <>
    <BillHeader
      ReceiptNumber={receipt.ReceiptNumber}
      FormattedTransactionDate={receipt.FormattedTransactionDate}
      ReceiptTypeDescription={receipt.ReceiptTypeDescription}
      IsNullified={receipt.IsNullified}
    />
    <BillClientHeader
      ClientLegalName={receipt.ClientLegalName}
      ClientCompositeAddress={receipt.ClientCompositeAddress}
      ClientTaxCode={receipt.ClientTaxCode}
      IsCreditCardSale={receipt.IsCreditCardSale}
      IsCreditNoteSale={receipt.IsCreditNoteSale}
    />
    <BillProductDetail
      Lines={receipt.Lines}
      FormattedSubtotal={receipt.FormattedSubtotal}
      FormattedVAT={receipt.FormattedVAT}
      FormattedTotal={receipt.FormattedTotal}
    />
  </>
);

import React, { PureComponent } from 'react';
import { Typography, Box } from '@material-ui/core';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import withLocalization from '../../localization/withLocalization';

class PurchaseBillDetailComponent extends PureComponent {
  buildProductLine = (selectedPurchase, servicePlanName, isAnualBuy) => {
    const line = {
      LineConcept: `Extension ${
        isAnualBuy ? '12 meses' : '1 mes'
      } - ${servicePlanName}`,
      Amount: selectedPurchase.price
    };

    return line;
  };

  buildTaxesLine = selectedPurchase => {
    const line = {
      LineConcept: 'IVA',
      Amount: selectedPurchase.price * 0.21
    };

    return line;
  };

  buildTotalLine = items => {
    const totalAmount = items.map(l => l.Amount).reduce((a, b) => a + b, 0);

    const line = {
      LineConcept: 'Total',
      Amount: totalAmount
    };

    return line;
  };

  addLineTo = (items, line) => {
    if (line) {
      items.push(line);
    }
  };

  buildGridDef = i10n => [
    {
      headerName: i10n['purchase-bill-detail.concept'],
      field: 'LineConcept',
      width: 300
    },
    {
      headerName: i10n['purchase-bill-detail.amount'],
      field: 'Amount'
    }
  ];

  componentDidMount() {
    this.dataGrid.api.sizeColumnsToFit();
  }

  render() {
    const { selectedPurchase, servicePlanName, isAnualBuy, i10n } = this.props;

    const productLine = this.buildProductLine(
      selectedPurchase,
      servicePlanName,
      isAnualBuy
    );
    const taxesLine = this.buildTaxesLine(selectedPurchase);

    const items = [];

    this.addLineTo(items, productLine);
    this.addLineTo(items, taxesLine);

    const totalLine = this.buildTotalLine(items);
    this.addLineTo(items, totalLine);

    return (
      <>
        <Box mt={3} mb={1}>
          <Typography variant="h5">
            {i10n['purchase-bill-detail.title']}
          </Typography>
        </Box>
        <div className="ag-theme-material" style={{ height: 207, width: 896 }}>
          <AgGridReact
            ref={c => (this.dataGrid = c)}
            rowSelection="single"
            columnDefs={this.buildGridDef(i10n)}
            rowData={items}
          />
        </div>
      </>
    );
  }
}

export const PurchaseBillDetail = withLocalization(PurchaseBillDetailComponent);

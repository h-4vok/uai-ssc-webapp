import React, { PureComponent } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Button } from '@material-ui/core';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import withLocalization from '../../localization/withLocalization';
import { ButtonBar } from '../molecules';

class EstablishedPaymentMethodsComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      oneRowSelected: false
    };
  }

  componentDidMount() {
    this.dataGrid.api.sizeColumnsToFit();

    this.dataGrid.api.addEventListener('selectionChanged', this.onRowSelection);
  }

  onRowSelection = e => {
    const selected = e.api.getSelectedRows();

    this.setState({
      oneRowSelected: selected.length === 1
    });
  };

  creditCardValueFormatter = params => {
    if (params.value) return params.value;

    if (this.props.paymentMethods.length === 1) {
      return this.props.currentPriceToPay + this.props.currentPriceToPay * 0.21;
    }

    return this.props.i10n['payment-method.grid.remainder'];
  };

  buildGridDef = i10n => [
    {
      headerName: i10n['payment-method.grid.type'],
      field: 'PaymentMethodType',
      checkboxSelection: true,
      width: 200
    },
    {
      headerName: i10n['payment-method.grid.reference'],
      field: 'PaymentMethodReference'
    },
    {
      headerName: i10n['payment-method.grid.value'],
      field: 'PaymentMethodValue',
      valueFormatter: this.creditCardValueFormatter
    }
  ];

  maskCreditCard = number => number.replace(/\d(?=\d{4})/g, '*');

  buildItems = paymentMethods => {
    const output = paymentMethods.map(item => {
      if (item.CCV) {
        return {
          PaymentMethodType: this.props.i10n['payment-method.type.credit-card'],
          PaymentMethodReference: this.maskCreditCard(item.Number),
          PaymentMethodValue: null,
          ReferenceModel: item
        };
      }

      return {
        PaymentMethodType: this.props.i10n['payment-method.type.credit-card'],
        PaymentMethodReference: item.Number,
        PaymentMethodValue: item.Total,
        ReferenceModel: item
      };
    });

    return output;
  };

  render() {
    const { paymentMethods, i10n, onDeletePaymentMethod } = this.props;
    const { oneRowSelected } = this.state;
    const items = this.buildItems(paymentMethods);

    return (
      <>
        <ButtonBar>
          <Button
            variant="contained"
            color="secondary"
            disabled={!oneRowSelected}
            onClick={() =>
              onDeletePaymentMethod(this.dataGrid.api.getSelectedRows()[0])
            }
          >
            {i10n['global.action.delete']}
          </Button>
        </ButtonBar>
        <div className="ag-theme-material" style={{ height: 200, width: 896 }}>
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

export const EstablishedPaymentMethods = withLocalization(
  EstablishedPaymentMethodsComponent
);

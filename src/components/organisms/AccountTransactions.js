import React, { PureComponent } from 'react';
import { Container, Button } from '@material-ui/core';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { withRouter } from 'react-router-dom';
import withLocalization from '../../localization/withLocalization';
import { ButtonBar } from '../molecules';

class AccountTransactionsComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      oneRowSelected: false
    };
  }

  viewBill = id => {
    const route = `/client-management/bill/${id}`;
    this.props.history.push(route);
  };

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

  buildGridDef = i10n => [
    {
      headerName: i10n['transaction.date'],
      field: 'TransactionDate',
      checkboxSelection: true
    },
    {
      headerName: i10n['transaction.receipt-type'],
      field: 'TransactionTypeCode',
      valueFormatter: ({ value }) => i10n[`transaction-type.${value}`]
    },
    {
      headerName: i10n['transaction.receipt-number'],
      field: 'ReceiptNumber'
    },
    {
      headerName: i10n['transaction.description'],
      field: 'TransactionDescription'
    },
    {
      headerName: i10n['transaction.amount'],
      field: 'Total'
    }
  ];

  callWithOne = action => {
    const item = this.dataGrid.api.getSelectedRows()[0];
    const id = item.ReceiptId;

    action(id);
  };

  render() {
    const { oneRowSelected } = this.state;
    const { items, onRefresh, onViewReceipt, i10n } = this.props;

    return (
      <Container>
        <ButtonBar>
          <Button variant="contained" color="primary" onClick={onRefresh}>
            {i10n['global.action.refresh']}
          </Button>
          <Button
            variant="contained"
            onClick={() => this.callWithOne(onViewReceipt)}
            disabled={!oneRowSelected}
          >
            {i10n['account-transactions.actions.view-receipt']}
          </Button>
        </ButtonBar>
        <div className="ag-theme-material" style={{ height: 500, width: 1042 }}>
          <AgGridReact
            ref={c => (this.dataGrid = c)}
            rowSelection="single"
            columnDefs={this.buildGridDef(i10n)}
            rowData={items}
          />
        </div>
      </Container>
    );
  }
}

export const AccountTransactions = withRouter(
  withLocalization(AccountTransactionsComponent)
);

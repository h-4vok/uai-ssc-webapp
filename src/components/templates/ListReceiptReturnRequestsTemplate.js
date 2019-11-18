import React, { PureComponent } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { ButtonBar } from '../molecules';
import withLocalization from '../../localization/withLocalization';

const styles = theme => ({
  centerText: {
    textAlign: 'center'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    display: 'flex'
  },
  button: {
    margin: theme.spacing(3, 0, 2),
    minWidth: 100
  },
  buttonBar: {
    display: 'flex',
    alignItems: 'center'
  }
});

class ListReceiptReturnRequestsTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      oneRowSelected: false,
      onePendingReturnSelected: false,
      oneApprovedReturnSelected: false
    };
  }

  componentDidMount() {
    this.dataGrid.api.sizeColumnsToFit();

    this.dataGrid.api.addEventListener('selectionChanged', this.onRowSelection);
  }

  onRowSelection = e => {
    const selected = e.api.getSelectedRows();

    const pendingReturns = selected.filter(x => !x.Approved && !x.Rejected);
    const approvedReturns = selected.filter(x => x.Approved);

    this.setState({
      oneRowSelected: selected.length === 1,
      onePendingReturnSelected: pendingReturns.length === 1,
      oneApprovedReturnSelected: approvedReturns.length === 1
    });
  };

  buildGridDef = i10n => [
    {
      headerName: i10n['global.id'],
      field: 'Id',
      sortable: true,
      filter: true,
      checkboxSelection: true
    },
    {
      headerName: i10n['receipt-return-request.grid.receipt-number'],
      field: 'ReceiptNumber'
    },
    {
      headerName: i10n['receipt-return-request.grid.status'],
      field: 'Status',
      valueFormatter: ({ value }) =>
        i10n[`receipt-return-request.status.${value}`]
    },
    {
      headerName: i10n['receipt-return-request.grid.request-date'],
      field: 'RequestDate'
    },
    {
      headerName: i10n['receipt-return-request.grid.review-by'],
      field: 'ApprovedBy',
      valueFormatter: ({ data }) => {
        if (data.Approved) return data.ApprovedBy;

        if (data.Rejected) return data.RejectedBy;

        return '';
      }
    },
    {
      headerName: i10n['receipt-return-request.grid.review-date'],
      field: 'ReviewDate'
    },
    {
      headerName:
        i10n['receipt-return-request.grid.related-credit-note-number'],
      field: 'RelatedCreditNoteNumber'
    }
  ];

  callWithOne = (action, idField = 'ReceiptId') => {
    const item = this.dataGrid.api.getSelectedRows()[0];
    const id = item[idField];

    action(id);
  };

  render() {
    const {
      items,
      classes,
      onRefresh,
      onViewBill,
      onApproveAction,
      onRejectAction,
      onViewCreditNote,
      i10n
    } = this.props;
    const {
      oneRowSelected,
      onePendingReturnSelected,
      oneApprovedReturnSelected
    } = this.state;

    return (
      <Container component="main" maxWidth="lg">
        <div className={classes.paper}>
          <ButtonBar>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={onRefresh}
            >
              {i10n['global.action.refresh']}
            </Button>
            <Button
              variant="contained"
              onClick={() => this.callWithOne(onViewBill)}
              className={classes.button}
              disabled={!oneRowSelected}
            >
              {i10n['account-transactions.actions.view-receipt']}
            </Button>
            <Button
              variant="contained"
              onClick={() => this.callWithOne(onApproveAction)}
              className={classes.button}
              disabled={!onePendingReturnSelected}
            >
              {i10n['global.action.approve']}
            </Button>
            <Button
              variant="contained"
              onClick={() => this.callWithOne(onRejectAction)}
              className={classes.button}
              disabled={!onePendingReturnSelected}
            >
              {i10n['global.action.reject']}
            </Button>
            <Button
              variant="contained"
              onClick={() =>
                this.callWithOne(onViewCreditNote, 'RelatedCreditNoteId')
              }
              className={classes.button}
              disabled={!oneApprovedReturnSelected}
            >
              {i10n['account-transactions.actions.view-credit-note']}
            </Button>
          </ButtonBar>

          <div
            className="ag-theme-material"
            style={{ height: 500, width: 1400 }}
          >
            <AgGridReact
              ref={c => (this.dataGrid = c)}
              rowSelection="single"
              columnDefs={this.buildGridDef(i10n)}
              rowData={items}
            />
          </div>
        </div>
      </Container>
    );
  }
}

export const ListReceiptReturnRequestsTemplate = withLocalization(
  withStyles(styles)(ListReceiptReturnRequestsTemplateComponent)
);

import React, { PureComponent } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { ButtonBar } from '../molecules';
import { GlobalState } from '../../lib/GlobalState';
import withLocalization from '../../localization/withLocalization';

const managementPermission = 'CLIENT_MANAGEMENT';

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

class ListClientsTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      oneRowSelected: false,
      multipleRowsSelected: false
    };
  }

  componentDidMount() {
    this.dataGrid.api.sizeColumnsToFit();

    this.dataGrid.api.addEventListener('selectionChanged', this.onRowSelection);
  }

  onRowSelection = e => {
    const selected = e.api.getSelectedRows();

    this.setState({
      oneRowSelected: selected.length === 1,
      multipleRowsSelected: selected.length > 0
    });
  };

  isEnabledFormatter = (params, i10n) =>
    params.value
      ? i10n['global.is-enabled.enabled']
      : i10n['global.is-enabled.disabled'];

  buildGridDef = i10n => [
    {
      headerName: i10n['global.id'],
      field: 'Id',
      sortable: true,
      filter: true,
      checkboxSelection: true,
      headerCheckboxSelection: true
    },
    {
      headerName: i10n['client-company.model.legal-name'],
      field: 'LegalName',
      sortable: true,
      filter: true
    },
    {
      headerName: i10n['client-company.model.tax-code'],
      field: 'TaxCode',
      sortable: true,
      filter: true
    },
    {
      headerName: i10n['client-company.model.selected-plan-description'],
      field: 'SelectedPlanDescription',
      sortable: true,
      filter: true
    },
    {
      headerName: i10n['client-company.model.selected-payment-type'],
      field: 'SelectedPaymentType',
      sortable: true,
      filter: true
    },
    {
      headerName: i10n['client-company.model.last-bill-expiration-date'],
      field: 'LastBillExpirationDate',
      sortable: true,
      filter: true
    },
    {
      headerName: i10n['client-company.model.balance-status-description'],
      field: 'BalanceStatusDescription',
      sortable: true,
      filter: true
    },
    {
      headerName: i10n['global.isenabled'],
      field: 'IsEnabled',
      sortable: true,
      filter: true,
      valueFormatter: params => this.isEnabledFormatter(params, i10n)
    }
  ];

  callWithOneItem = action => {
    const item = this.dataGrid.api.getSelectedRows()[0];
    const id = item.Id;

    action(id);
  };

  callWithSelected = action => {
    const items = this.dataGrid.api.getSelectedRows();

    action(items, this.dataGrid.api);
  };

  render() {
    const {
      items,
      classes,
      onRefresh,
      onViewTransactions,
      onViewAccountStatus,
      onEnableAction,
      onDisableAction,
      i10n
    } = this.props;
    const { oneRowSelected, multipleRowsSelected } = this.state;

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
            {GlobalState.Authorizer.has(managementPermission) && (
              <Button
                variant="contained"
                onClick={() => this.callWithOneItem(onViewTransactions)}
                className={classes.button}
                disabled={!oneRowSelected}
              >
                {i10n['client-management.action.view-transactions']}
              </Button>
            )}
            {GlobalState.Authorizer.has(managementPermission) && (
              <Button
                variant="contained"
                onClick={() => this.callWithOneItem(onViewAccountStatus)}
                className={classes.button}
                disabled={!oneRowSelected}
              >
                {i10n['client-management.action.view-status']}
              </Button>
            )}
            {GlobalState.Authorizer.has(managementPermission) && (
              <Button
                variant="contained"
                onClick={() => this.callWithSelected(onEnableAction)}
                className={classes.button}
                disabled={!multipleRowsSelected}
              >
                {i10n['global.action.enable']}
              </Button>
            )}
            {GlobalState.Authorizer.has(managementPermission) && (
              <Button
                variant="contained"
                onClick={() => this.callWithSelected(onDisableAction)}
                className={classes.button}
                disabled={!multipleRowsSelected}
              >
                {i10n['global.action.disable']}
              </Button>
            )}
          </ButtonBar>

          <div
            className="ag-theme-material"
            style={{ height: 500, width: 1400 }}
          >
            <AgGridReact
              ref={c => (this.dataGrid = c)}
              rowSelection="multiple"
              columnDefs={this.buildGridDef(i10n)}
              rowData={items}
            />
          </div>
        </div>
      </Container>
    );
  }
}

export const ListClientsTemplate = withLocalization(
  withStyles(styles)(ListClientsTemplateComponent)
);

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

class ListPlatformUsersTemplateComponent extends PureComponent {
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

  isDisabledFormatter = params =>
    params.value
      ? this.props.i10n['security.listUsers.isDisabled.true']
      : this.props.i10n['security.listUsers.isDisabled.false'];

  isBlockedFormatter = params =>
    params.value ? this.props.i10n['security.listUsers.isBlocked.true'] : '';

  isPlatformAdminFormatter = params =>
    params.value ? this.props.i10n['security.listUsers.isAdmin.true'] : '';

  buildGridDef = i10n => [
    {
      headerName: i10n['security.listUsers.grid.id'],
      field: 'Id',
      sortable: true,
      filter: true,
      checkboxSelection: true,
      headerCheckboxSelection: true
    },
    {
      headerName: i10n['security.listUsers.grid.clientName'],
      field: 'ClientName',
      sortable: true,
      filter: true
    },
    {
      headerName: i10n['security.listUsers.grid.userName'],
      field: 'UserName',
      sortable: true,
      filter: true
    },
    {
      headerName: i10n['security.listUsers.grid.isDisabled'],
      field: 'IsDisabled',
      sortable: true,
      filter: true,
      valueFormatter: this.isDisabledFormatter
    },
    {
      headerName: i10n['security.listUsers.grid.isBlocked'],
      field: 'IsBlocked',
      sortable: true,
      filter: true,
      valueFormatter: this.isBlockedFormatter
    },
    {
      headerName: i10n['security.listUsers.grid.countOfRoles'],
      field: 'CountOfRoles',
      sortable: true,
      filter: true,
      cellStyle: { textAlign: 'center' }
    },
    {
      headerName: i10n['security.listUsers.grid.countOfPermissions'],
      field: 'CountOfPermissions',
      sortable: true,
      filter: true,
      cellStyle: { textAlign: 'center' }
    },
    {
      headerName: i10n['security.listUsers.grid.isPlatformAdmin'],
      field: 'IsPlatformAdmin',
      sortable: true,
      filter: true,
      valueFormatter: this.isPlatformAdminFormatter
    }
  ];

  callEdit = onEditAction => {
    const item = this.dataGrid.api.getSelectedRows()[0];
    const id = item.Id;

    onEditAction(id);
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
      onNewAction,
      onEditAction,
      onEnableAction,
      onDisableAction,
      onDeleteAction,
      i10n
    } = this.props;
    const { oneRowSelected, multipleRowsSelected } = this.state;

    console.log({ i10n });

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
              {i10n['security.listUsers.refresh']}
            </Button>
            {GlobalState.Authorizer.has('USERS_MANAGEMENT') && (
              <Button
                variant="contained"
                onClick={onNewAction}
                className={classes.button}
              >
                {i10n['security.listUsers.new']}
              </Button>
            )}
            {GlobalState.Authorizer.has('USERS_MANAGEMENT') && (
              <Button
                variant="contained"
                onClick={() => this.callEdit(onEditAction)}
                className={classes.button}
                disabled={!oneRowSelected}
              >
                {i10n['security.listUsers.edit']}
              </Button>
            )}
            {GlobalState.Authorizer.has('USERS_MANAGEMENT') && (
              <Button
                variant="contained"
                onClick={() => this.callWithSelected(onEnableAction)}
                className={classes.button}
                disabled={!multipleRowsSelected}
              >
                {i10n['security.listUsers.enable']}
              </Button>
            )}
            {GlobalState.Authorizer.has('USERS_MANAGEMENT') && (
              <Button
                variant="contained"
                onClick={() => this.callWithSelected(onDisableAction)}
                className={classes.button}
                disabled={!multipleRowsSelected}
              >
                {i10n['security.listUsers.disable']}
              </Button>
            )}
            {GlobalState.Authorizer.has('USERS_MANAGEMENT') && (
              <Button
                variant="contained"
                onClick={() => this.callWithSelected(onDeleteAction)}
                className={classes.button}
                disabled={!multipleRowsSelected}
              >
                {i10n['security.listUsers.delete']}
              </Button>
            )}
            {/* <Button
              variant="contained"
              onClick={onExportAction}
              className={classes.button}
            >
              {i10n['security.listUsers.export']}
            </Button> */}
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

export const ListPlatformUsersTemplate = withLocalization(
  withStyles(styles)(ListPlatformUsersTemplateComponent)
);

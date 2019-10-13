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

class ListRolesTemplateComponent extends PureComponent {
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

  isEnabledFormatter = params =>
    params.value ? 'Habilitado' : 'No Habilitado';

  buildGridDef = i10n => [
    {
      headerName: i10n['security.listRoles.grid.id'],
      field: 'Id',
      sortable: true,
      filter: true,
      checkboxSelection: true,
      headerCheckboxSelection: true
    },
    {
      headerName: i10n['security.listRoles.grid.name'],
      field: 'Name',
      sortable: true,
      filter: true
    },
    {
      headerName: i10n['security.listRoles.grid.quantityOfUsers'],
      field: 'QuantityOfUsers',
      sortable: true,
      filter: true,
      cellStyle: { textAlign: 'center' }
    },
    {
      headerName: i10n['security.listRoles.grid.quantityOfPermissions'],
      field: 'QuantityOfPermissions',
      sortable: true,
      filter: true,
      cellStyle: { textAlign: 'center' }
    },
    {
      headerName: i10n['security.listRoles.grid.isEnabled'],
      field: 'IsEnabled',
      sortable: true,
      filter: true,
      valueFormatter: this.isEnabledFormatter
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

    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <ButtonBar>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={onRefresh}
            >
              {i10n['security.listRoles.refresh']}
            </Button>
            {GlobalState.Authorizer.has('ROLES_MANAGEMENT') && (
              <Button
                variant="contained"
                onClick={onNewAction}
                className={classes.button}
              >
                {i10n['security.listRoles.new']}
              </Button>
            )}
            {GlobalState.Authorizer.has('ROLES_MANAGEMENT') && (
              <Button
                variant="contained"
                onClick={() => this.callEdit(onEditAction)}
                className={classes.button}
                disabled={!oneRowSelected}
              >
                {i10n['security.listRoles.edit']}
              </Button>
            )}
            {GlobalState.Authorizer.has('ROLES_MANAGEMENT') && (
              <Button
                variant="contained"
                onClick={() => this.callWithSelected(onEnableAction)}
                className={classes.button}
                disabled={!multipleRowsSelected}
              >
                {i10n['security.listRoles.enable']}
              </Button>
            )}
            {GlobalState.Authorizer.has('ROLES_MANAGEMENT') && (
              <Button
                variant="contained"
                onClick={() => this.callWithSelected(onDisableAction)}
                className={classes.button}
                disabled={!multipleRowsSelected}
              >
                {i10n['security.listRoles.disable']}
              </Button>
            )}
            {GlobalState.Authorizer.has('ROLES_MANAGEMENT') && (
              <Button
                variant="contained"
                onClick={() => this.callWithSelected(onDeleteAction)}
                className={classes.button}
                disabled={!multipleRowsSelected}
              >
                {i10n['security.listRoles.delete']}
              </Button>
            )}
            {/* <Button
              variant="contained"
              onClick={onExportAction}
              className={classes.button}
            >
              {i10n['security.listRoles.export']}
            </Button> */}
          </ButtonBar>

          <div
            className="ag-theme-material"
            style={{ height: 500, width: 1024 }}
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

export const ListRolesTemplate = withLocalization(
  withStyles(styles)(ListRolesTemplateComponent)
);

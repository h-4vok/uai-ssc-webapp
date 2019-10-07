import React, { PureComponent } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { ButtonBar } from '../molecules';
import { GlobalState } from '../../lib/GlobalState';

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

  buildGridDef = () => [
    {
      headerName: 'ID',
      field: 'Id',
      sortable: true,
      filter: true,
      checkboxSelection: true,
      headerCheckboxSelection: true
    },
    {
      headerName: 'Nombre',
      field: 'Name',
      sortable: true,
      filter: true
    },
    {
      headerName: '# de Usuarios',
      field: 'QuantityOfUsers',
      sortable: true,
      filter: true,
      cellStyle: { textAlign: 'center' }
    },
    {
      headerName: '# de Permisos',
      field: 'QuantityOfPermissions',
      sortable: true,
      filter: true,
      cellStyle: { textAlign: 'center' }
    },
    {
      headerName: 'Habilitado',
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
      onExportAction
    } = this.props;
    const { oneRowSelected, multipleRowsSelected } = this.state;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <ButtonBar>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={onRefresh}
            >
              Ejecutar
            </Button>
            {GlobalState.Authorizer.has('ROLES_MANAGEMENT') && (
              <Button
                variant="contained"
                onClick={onNewAction}
                className={classes.button}
              >
                Nuevo
              </Button>
            )}
            {GlobalState.Authorizer.has('ROLES_MANAGEMENT') && (
              <Button
                variant="contained"
                onClick={() => this.callEdit(onEditAction)}
                className={classes.button}
                disabled={!oneRowSelected}
              >
                Editar
              </Button>
            )}
            {GlobalState.Authorizer.has('ROLES_MANAGEMENT') && (
              <Button
                variant="contained"
                onClick={() => this.callWithSelected(onEnableAction)}
                className={classes.button}
                disabled={!multipleRowsSelected}
              >
                Habilitar
              </Button>
            )}
            {GlobalState.Authorizer.has('ROLES_MANAGEMENT') && (
              <Button
                variant="contained"
                onClick={() => this.callWithSelected(onDisableAction)}
                className={classes.button}
                disabled={!multipleRowsSelected}
              >
                Inhabilitar
              </Button>
            )}
            {GlobalState.Authorizer.has('ROLES_MANAGEMENT') && (
              <Button
                variant="contained"
                onClick={() => this.callWithSelected(onDeleteAction)}
                className={classes.button}
                disabled={!multipleRowsSelected}
              >
                Eliminar
              </Button>
            )}
            <Button
              variant="contained"
              onClick={onExportAction}
              className={classes.button}
            >
              Exportar
            </Button>
          </ButtonBar>

          <div
            className="ag-theme-material"
            style={{ height: 500, width: 1024 }}
          >
            <AgGridReact
              ref={c => (this.dataGrid = c)}
              rowSelection="multiple"
              columnDefs={this.buildGridDef()}
              rowData={items}
            />
          </div>
        </div>
      </Container>
    );
  }
}

export const ListRolesTemplate = withStyles(styles)(ListRolesTemplateComponent);

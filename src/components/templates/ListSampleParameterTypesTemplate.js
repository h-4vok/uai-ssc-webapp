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

class ListSampleParameterTypesTemplateComponent extends PureComponent {
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

  descriptionFormatter = (params, i10n) =>
    i10n[`security.sample-parameter-type.description[${params.value}]`];

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
      headerName: i10n['global.code'],
      field: 'Code',
      sortable: true,
      filter: true
    },
    {
      headerName: i10n['global.description'],
      field: 'Code',
      sortable: true,
      filter: true,
      valueFormatter: params => this.descriptionFormatter(params, i10n)
    },
    {
      headerName: i10n['security.model.sample-parameter-type.data-type-name'],
      field: 'DataTypeName',
      sortable: true,
      filter: true
    },
    {
      headerName: i10n['security.model.sample-parameter-type.minimum-range'],
      field: 'MinimumRange',
      sortable: true,
      filter: true
    },
    {
      headerName: i10n['security.model.sample-parameter-type.maximum-range'],
      field: 'MaximumRange',
      sortable: true,
      filter: true
    },
    {
      headerName: i10n['security.model.sample-parameter-type.decimal-digits'],
      field: 'DecimalDigits',
      sortable: true,
      filter: true
    },
    {
      headerName: i10n['security.model.sample-parameter-type.updated-date'],
      field: 'UpdatedDate',
      sortable: true,
      filter: true
    },
    {
      headerName: i10n['security.model.sample-parameter-type.updated-by'],
      field: 'UpdatedBy',
      sortable: true,
      filter: true
    },
    {
      headerName: i10n['security.model.sample-parameter-type.isEnabled'],
      field: 'IsEnabled',
      sortable: true,
      filter: true,
      valueFormatter: params => this.isEnabledFormatter(params, i10n)
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
            {GlobalState.Authorizer.has(
              'SAMPLE_TYPE_PARAMETERS_MANAGEMENT'
            ) && (
              <Button
                variant="contained"
                onClick={onNewAction}
                className={classes.button}
              >
                {i10n['global.action.new']}
              </Button>
            )}
            {GlobalState.Authorizer.has(
              'SAMPLE_TYPE_PARAMETERS_MANAGEMENT'
            ) && (
              <Button
                variant="contained"
                onClick={() => this.callEdit(onEditAction)}
                className={classes.button}
                disabled={!oneRowSelected}
              >
                {i10n['global.action.edit']}
              </Button>
            )}
            {GlobalState.Authorizer.has(
              'SAMPLE_TYPE_PARAMETERS_MANAGEMENT'
            ) && (
              <Button
                variant="contained"
                onClick={() => this.callWithSelected(onEnableAction)}
                className={classes.button}
                disabled={!multipleRowsSelected}
              >
                {i10n['global.action.enable']}
              </Button>
            )}
            {GlobalState.Authorizer.has(
              'SAMPLE_TYPE_PARAMETERS_MANAGEMENT'
            ) && (
              <Button
                variant="contained"
                onClick={() => this.callWithSelected(onDisableAction)}
                className={classes.button}
                disabled={!multipleRowsSelected}
              >
                {i10n['global.action.disable']}
              </Button>
            )}
            {GlobalState.Authorizer.has(
              'SAMPLE_TYPE_PARAMETERS_MANAGEMENT'
            ) && (
              <Button
                variant="contained"
                onClick={() => this.callWithSelected(onDeleteAction)}
                className={classes.button}
                disabled={!multipleRowsSelected}
              >
                {i10n['global.action.delete']}
              </Button>
            )}
            {/* <Button
              variant="contained"
              onClick={onExportAction}
              className={classes.button}
            >
              {i10n['global.action.export']}
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

export const ListSampleParameterTypesTemplate = withLocalization(
  withStyles(styles)(ListSampleParameterTypesTemplateComponent)
);

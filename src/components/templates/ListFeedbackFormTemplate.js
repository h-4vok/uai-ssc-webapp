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

const managementPermission = 'PLATFORM_ADMIN';

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

class ListFeedbackFormTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      oneRowSelected: false,
      twoRowsSelected: false
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
      twoRowsSelected: selected.length === 2
    });
  };

  isCurrentFormatter = (params, i10n) =>
    params.value
      ? i10n['feedback-form.is-current.true']
      : i10n['feedback-form.is-current.false'];

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
      headerName: i10n['global.created-date'],
      field: 'CreatedDate',
      sortable: true,
      filter: true
    },
    {
      headerName: i10n['feedback-form.is-current'],
      field: 'IsCurrent',
      sortable: true,
      filter: true,
      valueFormatter: params => this.isCurrentFormatter(params, i10n)
    }
  ];

  callWithSelected = action => {
    const items = this.dataGrid.api.getSelectedRows();

    action(items, this.dataGrid.api);
  };

  callWithSingleSelected = callback => {
    const item = this.dataGrid.api.getSelectedRows()[0];
    const id = item.Id;

    callback(id);
  };

  render() {
    const {
      items,
      classes,
      onRefresh,
      onNewAction,
      onSettingIsCurrentAction,
      onViewResultsAction,
      onCompareResultsAction,
      i10n
    } = this.props;
    const { oneRowSelected, twoRowsSelected } = this.state;

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
                onClick={onNewAction}
                className={classes.button}
              >
                {i10n['global.action.new']}
              </Button>
            )}
            {GlobalState.Authorizer.has(managementPermission) && (
              <Button
                variant="contained"
                onClick={() => this.callWithSelected(onSettingIsCurrentAction)}
                className={classes.button}
                disabled={!oneRowSelected}
              >
                {i10n['feedback-form.action.set-is-current']}
              </Button>
            )}
            <Button
              variant="contained"
              onClick={() => this.callWithSingleSelected(onViewResultsAction)}
              className={classes.button}
              disabled={!oneRowSelected}
            >
              {i10n['global.action.view-results']}
            </Button>
            <Button
              variant="contained"
              onClick={() => this.callWithSelected(onCompareResultsAction)}
              className={classes.button}
              disabled={!twoRowsSelected}
            >
              {i10n['global.action.compare-results']}
            </Button>
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

export const ListFeedbackFormTemplate = withLocalization(
  withStyles(styles)(ListFeedbackFormTemplateComponent)
);

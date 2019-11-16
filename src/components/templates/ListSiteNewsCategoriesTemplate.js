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

const managementPermission = 'NEWS_MANAGEMENT';

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

class ListSiteNewsCategoriesTemplateComponent extends PureComponent {
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

  buildGridDef = i10n => [
    {
      headerName: i10n['global.id'],
      field: 'Id',
      sortable: true,
      filter: true,
      checkboxSelection: true,
      headerCheckboxSelection: true,
      width: 50
    },
    {
      headerName: i10n['global.description'],
      field: 'Description',
      sortable: true,
      filter: true
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
                onClick={() => this.callEdit(onEditAction)}
                className={classes.button}
                disabled={!oneRowSelected}
              >
                {i10n['global.action.edit']}
              </Button>
            )}
            {GlobalState.Authorizer.has(managementPermission) && (
              <Button
                variant="contained"
                onClick={() => this.callWithSelected(onDeleteAction)}
                className={classes.button}
                disabled={!multipleRowsSelected}
              >
                {i10n['global.action.delete']}
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

export const ListSiteNewsCategoriesTemplate = withLocalization(
  withStyles(styles)(ListSiteNewsCategoriesTemplateComponent)
);

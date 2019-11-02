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

class ListLogsTemplateComponent extends PureComponent {
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

  eventTypeFormatter = params => {
    return params.value.Description === 'Information'
      ? this.props.i10n['event-type.info']
      : this.props.i10n['event-type.error'];
  };

  createdDateFormatter = params => params.value;

  buildGridDef = i10n => [
    {
      headerName: i10n['security.listLogs.grid.id'],
      field: 'Id',
      sortable: true,
      filter: true,
      checkboxSelection: true
    },
    {
      headerName: i10n['security.listLogs.grid.createddate'],
      field: 'LoggedDate',
      sortable: true,
      filter: true,
      cellStyle: { textAlign: 'left' }
    },
    {
      headerName: i10n['security.listLogs.grid.user'],
      field: 'UserReference',
      sortable: true,
      filter: true
    },
    {
      headerName: i10n['security.listLogs.grid.event-type'],
      field: 'EventType',
      sortable: true,
      filter: true,
      valueFormatter: this.eventTypeFormatter
    },
    {
      headerName: i10n['security.listLogs.grid.message'],
      field: 'Message',
      sortable: true,
      filter: true
    }
  ];

  callRead = onAction => {
    const item = this.dataGrid.api.getSelectedRows()[0];

    onAction(item.Id);
  };

  render() {
    const { items, classes, onRefresh, onReadAction, i10n } = this.props;
    const { oneRowSelected } = this.state;

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
              {i10n['security.listLogs.refresh']}
            </Button>
            {GlobalState.Authorizer.has('PLATFORM_ADMIN') && (
              <Button
                variant="contained"
                onClick={() => this.callRead(onReadAction)}
                className={classes.button}
                disabled={!oneRowSelected}
              >
                {i10n['security.listLogs.read']}
              </Button>
            )}
          </ButtonBar>

          <div
            className="ag-theme-material"
            style={{ height: 500, width: 1024 }}
          >
            <AgGridReact
              ref={c => (this.dataGrid = c)}
              rowSelection="single"
              columnDefs={this.buildGridDef(i10n)}
              rowData={items}
              pagination
              paginationAutoPageSize
            />
          </div>
        </div>
      </Container>
    );
  }
}

export const ListLogsTemplate = withLocalization(
  withStyles(styles)(ListLogsTemplateComponent)
);

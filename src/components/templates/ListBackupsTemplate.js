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

class ListBackupsTemplateComponent extends PureComponent {
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

  buildGridDef = i10n => [
    {
      headerName: i10n['global.id'],
      field: 'Id',
      sortable: true,
      filter: true,
      checkboxSelection: true
    },
    {
      headerName: i10n['backup.filepath'],
      field: 'FilePath',
      sortable: true,
      filter: true
    },
    {
      headerName: i10n['backup.date'],
      field: 'BackupDate',
      sortable: true,
      filter: true
    },
    {
      headerName: i10n['backup.createdby'],
      field: 'CreatedBy',
      sortable: true,
      filter: true
    }
  ];

  callRestore = onRestoreAction => {
    const item = this.dataGrid.api.getSelectedRows()[0];
    const id = item.Id;

    onRestoreAction(id, this.dataGrid.api);
  };

  render() {
    const {
      items,
      classes,
      onRefresh,
      onBackupAction,
      onBackupBrowseAction,
      onRestoreAction,
      onRestoreFromAction,
      i10n
    } = this.props;
    const { oneRowSelected } = this.state;

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
            {GlobalState.Authorizer.has('PLATFORM_BACKUP') && (
              <Button
                variant="contained"
                onClick={onBackupAction}
                className={classes.button}
              >
                {i10n['backup.doBackup']}
              </Button>
            )}
            {GlobalState.Authorizer.has('PLATFORM_BACKUP') && (
              <Button
                variant="contained"
                onClick={onBackupBrowseAction}
                className={classes.button}
              >
                {i10n['backup.doBackupTo']}
              </Button>
            )}
            {GlobalState.Authorizer.has('PLATFORM_RESTORE') && (
              <Button
                variant="contained"
                onClick={() => this.callRestore(onRestoreAction)}
                className={classes.button}
                disabled={!oneRowSelected}
              >
                {i10n['backup.doRestore']}
              </Button>
            )}
            {GlobalState.Authorizer.has('PLATFORM_RESTORE') && (
              <Button
                variant="contained"
                onClick={onRestoreFromAction}
                className={classes.button}
              >
                {i10n['backup.doRestoreFrom']}
              </Button>
            )}
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

export const ListBackupsTemplate = withLocalization(
  withStyles(styles)(ListBackupsTemplateComponent)
);

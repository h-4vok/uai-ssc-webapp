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

class ListChatConversationsTemplateComponent extends PureComponent {
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
      headerName: i10n['platform-chat.grid.user-id'],
      field: 'UserId',
      sortable: true,
      filter: true,
      checkboxSelection: true,
      headerCheckboxSelection: true
    },
    {
      headerName: i10n['platform-chat.grid.user-name'],
      field: 'UserName',
      sortable: true,
      filter: true
    },
    {
      headerName: i10n['platform-chat.grid.pending-count'],
      field: 'PendingCount',
      sortable: true,
      filter: true
    },
    {
      headerName: i10n['platform-chat.grid.needs-reply'],
      field: 'PendingCount',
      sortable: true,
      filter: true,
      valueFormatter: params => (params.value ? i10n['global.yes'] : '')
    }
  ];

  callWithOneItem = action => {
    const item = this.dataGrid.api.getSelectedRows()[0];
    const id = item.UserId;

    action(id, item);
  };

  render() {
    const { items, classes, onRefresh, onReplyAction, i10n } = this.props;
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
            <Button
              variant="contained"
              onClick={() => this.callWithOneItem(onReplyAction)}
              className={classes.button}
              disabled={!oneRowSelected}
            >
              {i10n['platform-chat.action.reply']}
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

export const ListChatConversationsTemplate = withLocalization(
  withStyles(styles)(ListChatConversationsTemplateComponent)
);

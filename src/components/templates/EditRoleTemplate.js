import React, { PureComponent } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import withLocalization from '../../localization/withLocalization';

const styles = theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

class EditRoleTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    if (this.isEditAction()) {
      const { Name, Permissions } = this.props.model;

      this.state = {
        Name,
        Permissions: [...Permissions]
      };
    } else {
      this.state = {
        Name: null,
        Permissions: []
      };
    }
  }

  isEditAction() {
    return this.props.model && this.props.model.Id;
  }

  componentDidMount() {
    this.dataGrid.api.sizeColumnsToFit();
    this.dataGrid.api.addEventListener('selectionChanged', this.onRowSelection);
    this.onGridReady();
  }

  onInputChange = event => {
    this.props.model[event.target.name] = event.target.value;
    this.setState({ [event.target.name]: event.target.value });
  };

  onRowSelection = e => {
    const selected = e.api.getSelectedRows();
    this.props.model.Permissions = selected;
  };

  onGridReady = () => {
    if (!this.isEditAction()) return;

    const isSelectedPermission = id =>
      this.state.Permissions.some(
        selectedPermission => selectedPermission.Id === id
      );

    this.dataGrid.api.forEachNode(node => {
      if (isSelectedPermission(node.data.Id)) {
        node.setSelected(true);
      }
    });
  };

  buildGridDef = i10n => [
    {
      headerName: i10n['security.editRole.grid.id'],
      field: 'Id',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      width: 200
    },
    {
      headerName: i10n['security.editRole.grid.code'],
      field: 'Code',
      width: 400
    },
    {
      headerName: i10n['security.editRole.grid.name'],
      field: 'Name',
      width: 600
    }
  ];

  render() {
    const { classes, permissions, onConfirm, i10n } = this.props;
    const { Name } = this.state;

    return (
      <Container component="main" maxWidth="lg">
        <div className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            {this.props.modelId
              ? i10n['security.editRole.title.edit']
              : i10n['security.editRole.title.new']}
          </Typography>
        </div>
        <form className={classes.form} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                inputProps={{ maxLength: 300 }}
                id="Name"
                name="Name"
                label={i10n['security.editRole.name']}
                fullWidth
                value={Name}
                onChange={this.onInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <div
                className="ag-theme-material"
                style={{ height: 400, width: 'auto' }}
              >
                <AgGridReact
                  ref={c => (this.dataGrid = c)}
                  rowSelection="multiple"
                  rowMultiSelectWithClick
                  rowDeselection
                  suppressHorizontalScroll
                  columnDefs={this.buildGridDef(i10n)}
                  rowData={permissions}
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={onConfirm}
              >
                {i10n['security.editRole.confirm']}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    );
  }
}

export const EditRoleTemplate = withLocalization(
  withStyles(styles)(EditRoleTemplateComponent)
);

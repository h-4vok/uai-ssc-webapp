import React, { PureComponent } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

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

    this.screenTitle = this.props.modelId ? 'Nuevo Rol' : 'Editar Rol';

    if (this.props.model) {
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

  componentDidMount() {
    this.dataGrid.api.sizeColumnsToFit();
    this.dataGrid.api.addEventListener('selectionChanged', this.onRowSelection);
  }

  onInputChange = event => {
    this.props.model[event.target.name] = event.target.value;
    this.setState({ [event.target.name]: event.target.value });
  };

  onRowSelection = e => {
    const selected = e.api.getSelectedRows();
    this.props.model.Permissions = selected;
  };

  buildGridDef = () => [
    {
      headerName: 'ID',
      field: 'Id',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      width: 200
    },
    {
      headerName: 'Código',
      field: 'Code',
      width: 400
    },
    {
      headerName: 'Nombre',
      field: 'Name',
      width: 600
    }
  ];

  render() {
    const { classes, permissions, onConfirm } = this.props;
    const { Name, Permissions } = this.state;

    return (
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            {this.screenTitle}
          </Typography>
        </div>
        <form className={classes.form} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                maxLength="300"
                id="Name"
                name="Name"
                label="Nombre del Rol"
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
                  columnDefs={this.buildGridDef()}
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
                Continuar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    );
  }
}

export const EditRoleTemplate = withStyles(styles)(EditRoleTemplateComponent);

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
import { SimpleSelect } from '../atoms';

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

class EditUserTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    if (this.isEditAction()) {
      const { UserName, Roles, ClientCompany } = this.props.model;

      this.state = {
        UserName,
        Roles: [...Roles],
        ClientCompany,
        clientCompanies: this.buildCompanies(this.props.clientCompanies)
      };
    } else {
      this.state = {
        UserName: null,
        Roles: [],
        ClientCompany: null,
        clientCompanies: this.buildCompanies(this.props.clientCompanies)
      };
    }
  }

  buildCompanies = clientCompanies =>
    clientCompanies.map(item => ({ value: item.Id, label: item.LegalName }));

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
    this.props.model.Roles = selected;
  };

  onGridReady = () => {
    if (!this.isEditAction()) return;

    const isSelectedRole = id =>
      this.state.Roles.some(selectedRole => selectedRole.Id === id);

    this.dataGrid.api.forEachNode(node => {
      if (isSelectedRole(node.data.Id)) {
        node.setSelected(true);
      }
    });
  };

  buildGridDef = i10n => [
    {
      headerName: i10n['security.listRoles.grid.id'],
      field: 'Id',
      checkboxSelection: true,
      headerCheckboxSelection: true
    },
    {
      headerName: i10n['security.listRoles.grid.name'],
      field: 'Name'
    }
  ];

  onSelectedClientCompanyChange = event => {
    const selectedId = event.target.value;
    const selectedCompany = this.props.clientCompanies.find(
      x => x.Id === selectedId
    );

    this.props.model.ClientCompany = selectedCompany;
    this.setState({
      ClientCompany: selectedCompany
    });
  };

  render() {
    const { classes, roles, onConfirm, i10n } = this.props;
    const { UserName, ClientCompany, clientCompanies } = this.state;

    return (
      <Container component="main" maxWidth="lg">
        <div className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            {this.props.modelId
              ? i10n['security.editUser.title.edit']
              : i10n['security.editUser.title.new']}
          </Typography>
        </div>
        <form className={classes.form} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                inputProps={{ maxLength: 300 }}
                id="UserName"
                name="UserName"
                label={i10n['model.user.username']}
                fullWidth
                value={UserName}
                onChange={this.onInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <SimpleSelect
                name="ClientCompany"
                label={i10n['model.user.clientCompany']}
                fullWidth
                items={clientCompanies}
                value={ClientCompany && ClientCompany.Id}
                onChange={this.onSelectedClientCompanyChange}
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
                  rowData={roles}
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
                {i10n['security.editUser.confirm']}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    );
  }
}

export const EditUserTemplate = withLocalization(
  withStyles(styles)(EditUserTemplateComponent)
);

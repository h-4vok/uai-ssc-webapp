import React, { PureComponent } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import withLocalization from '../../localization/withLocalization';
import { SimpleTextField } from '../atoms';

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

class EditSampleTypeTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    const { Name, Parameters } = this.props.model;

    this.state = {
      Name,
      Parameters
    };
  }

  isEditAction() {
    return this.props.model && this.props.model.Id;
  }

  componentDidMount() {
    this.dataGrid.api.sizeColumnsToFit();
    this.dataGrid.api.addEventListener('selectionChanged', this.onRowSelection);
    this.onGridReady();
  }

  onRowSelection = e => {
    const selected = e.api.getSelectedRows();
    this.props.model.Parameters = selected;
  };

  onInputChange = event => {
    this.props.model[event.target.name] = event.target.value;
    this.setState({ [event.target.name]: event.target.value });
  };

  onGridReady = () => {
    if (!this.isEditAction()) return;

    const isSelectedParameter = id =>
      this.state.Parameters.some(
        selectedParameter => selectedParameter.Id === id
      );

    this.dataGrid.api.forEachNode(node => {
      if (isSelectedParameter(node.data.Id)) {
        node.setSelected(true);
      }
    });
  };

  buildGridDef = i10n => [
    {
      headerName: i10n['global.id'],
      field: 'Id',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      width: 200
    },
    {
      headerName: i10n['global.code'],
      field: 'Code',
      width: 400
    },
    {
      headerName: i10n['global.description'],
      field: 'Description',
      width: 600
    }
  ];

  render() {
    const { classes, sampleTypeParameters, onConfirm, i10n } = this.props;
    const { Name } = this.state;

    return (
      <Container component="main" maxWidth="md">
        <div className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            {this.props.modelId
              ? i10n['configuration.sample-type.title.edit']
              : i10n['configuration.sample-type.title.new']}
          </Typography>
        </div>
        <form className={classes.form} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <SimpleTextField
                required
                maxLength="100"
                id="Name"
                name="Name"
                label={i10n['global.name']}
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
                  rowData={sampleTypeParameters}
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
                {i10n['global.confirm']}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    );
  }
}

export const EditSampleTypeTemplate = withLocalization(
  withStyles(styles)(EditSampleTypeTemplateComponent)
);

import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react';
import withLocalization from '../../localization/withLocalization';
import { SimpleTextField, SimpleSelect } from '../atoms';
import { ButtonBar } from '../molecules';

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
  },
  button: {
    margin: theme.spacing(3, 0, 2),
    minWidth: 100
  }
});

class EditPlatformMenuTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    const { Code, TranslationKey, MenuOrder, Items } = this.props.model;

    this.state = {
      Code,
      TranslationKey,
      MenuOrder,
      Items: this.isEditAction() ? [...Items] : [],
      oneRowSelected: false,
      multipleRowsSelected: false,
      translationKeys: this.buildTranslationKeys(this.props.translationKeys)
    };
  }

  buildTranslationKeys = items =>
    items.map(item => ({ value: item, label: item }));

  isEditAction() {
    return this.props.model && this.props.model.Id;
  }

  onInputChange = event => {
    this.props.model[event.target.name] = event.target.value;
    this.setState({ [event.target.name]: event.target.value });
  };

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
      checkboxSelection: true
    },
    {
      headerName: i10n['global.code'],
      field: 'Code'
    },
    {
      headerName: i10n['platform-menu-item.menu-order'],
      field: 'MenuOrder'
    },
    {
      headerName: i10n['platform-menu-item.relative-route'],
      field: 'RelativeRoute'
    }
  ];

  onNewItem() {}

  onEditItem() {}

  onDeleteItem() {}

  render() {
    const { classes, onConfirm, i10n, permissions } = this.props;
    const {
      Code,
      TranslationKey,
      MenuOrder,
      Items,
      translationKeys,
      oneRowSelected,
      multipleRowsSelected
    } = this.state;

    return (
      <Container component="main" maxWidth="lg">
        <div className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            {this.props.modelId
              ? i10n['configuration.platform-menu.title.edit']
              : i10n['configuration.platform-menu.title.new']}
          </Typography>
        </div>
        <form className={classes.form} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <SimpleTextField
                required
                maxLength="100"
                id="Code"
                name="Code"
                label={i10n['global.code']}
                fullWidth
                value={Code}
                onChange={this.onInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <SimpleTextField
                required
                id="MenuOrder"
                name="MenuOrder"
                type="number"
                inputProps={{ min: 0, max: 100 }}
                label={i10n['platform-menu.menu-order']}
                fullWidth
                value={MenuOrder}
                onChange={this.onInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <SimpleSelect
                required
                name="TranslationKey"
                label={i10n['platform-menu.translation-key']}
                fullWidth
                items={translationKeys}
                value={TranslationKey}
                onChange={this.onInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <ButtonBar>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={this.onNewItem}
                >
                  {i10n['global.action.new']}
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={this.onEditItem}
                  disabled={!oneRowSelected}
                >
                  {i10n['global.action.edit']}
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={this.onDeleteItem}
                  disabled={!multipleRowsSelected}
                >
                  {i10n['global.action.delete']}
                </Button>
              </ButtonBar>
            </Grid>

            <Grid item xs={12}>
              <div
                className="ag-theme-material"
                style={{ height: 400, width: 'auto' }}
              >
                <AgGridReact
                  ref={c => (this.dataGrid = c)}
                  rowSelection="single"
                  suppressHorizontalScroll
                  columnDefs={this.buildGridDef(i10n)}
                  rowData={Items}
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

export const EditPlatformMenuTemplate = withLocalization(
  withStyles(styles)(EditPlatformMenuTemplateComponent)
);

import React, { PureComponent } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
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

class EditSiteNewsArticlesTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    const {
      Author,
      Title,
      Content,
      PublicationDate,
      Categories
    } = this.props.model;

    this.state = {
      Author,
      Title,
      Content,
      PublicationDate,
      Categories
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

  onInputChange = event => {
    this.props.model[event.target.name] = event.target.value;
    this.setState({ [event.target.name]: event.target.value });
  };

  onDateChange = date => {
    this.props.model.PublicationDate = date;
    this.setState({ PublicationDate: date });
  };

  onFileChange = evt => {
    const File = evt.target.files[0];
    this.props.onFileSelected(File);
  };

  onRowSelection = e => {
    const selected = e.api.getSelectedRows();
    this.props.model.Categories = selected;
  };

  onGridReady = () => {
    if (!this.isEditAction()) return;

    const isSelectedItem = id =>
      this.state.Categories.some(
        selectedCategory => selectedCategory.Id === id
      );

    this.dataGrid.api.forEachNode(node => {
      if (isSelectedItem(node.data.Id)) {
        node.setSelected(true);
      }
    });
  };

  buildGridDef = i10n => [
    {
      headerName: i10n['global.description'],
      field: 'Description',
      checkboxSelection: true,
      headerCheckboxSelection: true
    }
  ];

  render() {
    const { classes, onConfirm, i10n, categories } = this.props;
    const { Author, Title, Content, PublicationDate } = this.state;

    return (
      <Container component="main" maxWidth="lg">
        <div className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            {this.props.modelId
              ? i10n['marketing.site-news.title.edit']
              : i10n['marketing.site-news.title.new']}
          </Typography>
        </div>
        <form className={classes.form} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <SimpleTextField
                required
                maxLength="500"
                id="Author"
                name="Author"
                label={i10n['site-news.author']}
                fullWidth
                value={Author}
                onChange={this.onInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <SimpleTextField
                required
                maxLength="500"
                id="Title"
                name="Title"
                label={i10n['site-news.title']}
                fullWidth
                value={Title}
                onChange={this.onInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="PublicationDate"
                  name="PublicationDate"
                  label={i10n['site-news.publication-date']}
                  format="dd/MM/yyyy"
                  value={PublicationDate}
                  onChange={this.onDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={12}>
              <Typography>{i10n['site-news.thumbnail-image']}</Typography>
            </Grid>

            <Grid item xs={12}>
              <input
                type="file"
                name="File"
                onChange={this.onFileChange}
                accept="image/*"
              />
            </Grid>

            <Grid item xs={12}>
              <div
                className="ag-theme-material"
                style={{ height: 200, width: 'auto' }}
              >
                <AgGridReact
                  ref={c => (this.dataGrid = c)}
                  rowSelection="multiple"
                  rowMultiSelectWithClick
                  rowDeselection
                  suppressHorizontalScroll
                  columnDefs={this.buildGridDef(i10n)}
                  rowData={categories}
                />
              </div>
            </Grid>

            <Grid item xs={12}>
              <SimpleTextField
                required
                variant="outlined"
                maxLength="8000"
                id="Content"
                name="Content"
                label={i10n['site-news.content']}
                fullWidth
                value={Content}
                onChange={this.onInputChange}
                multiline
                rows="10"
                rowsMax="40"
              />
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

export const EditSiteNewsArticlesTemplate = withLocalization(
  withStyles(styles)(EditSiteNewsArticlesTemplateComponent)
);

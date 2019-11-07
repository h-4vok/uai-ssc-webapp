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
import { ButtonBar } from '../molecules';
import { EditFeedbackFormQuestionDialogTemplate } from '.';

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

class EditFeedbackFormTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      Questions: [],
      oneRowSelected: false,
      multipleRowsSelected: false,
      dialogOpen: false,
      currentItem: null,
      isDialogEdit: false
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
      checkboxSelection: true,
      suppressSizeToFit: false,
      width: 50
    },
    {
      headerName: i10n['feedback-form-question.question'],
      field: 'Question'
    }
  ];

  onNewItem = () => {
    const newItem = {
      Question: '',
      Choices: []
    };

    this.setState({
      dialogOpen: true,
      currentItem: newItem,
      isDialogEdit: false
    });
  };

  onEditItem = () => {
    const selectedItem = this.dataGrid.api.getSelectedRows()[0];

    this.setState({
      dialogOpen: true,
      currentItem: selectedItem,
      isDialogEdit: true
    });
  };

  onDeleteItem = () => {
    const selected = this.dataGrid.api.getSelectedRows();

    this.setState(prevState => ({
      Questions: prevState.Questions.filter(
        item => !selected.some(selectedItem => selectedItem === item)
      )
    }));
  };

  onCloseMenuItem = () => {
    this.setState({
      dialogOpen: false
    });
  };

  onConfirmItem = () => {
    this.setState(
      prevState => ({
        dialogOpen: false,
        Questions: prevState.isDialogEdit
          ? [...prevState.Questions]
          : [...prevState.Questions, prevState.currentItem]
      }),
      () => this.dataGrid.api.redrawRows()
    );
  };

  onConfirm(callback) {
    this.props.model.Questions = this.state.Questions;
    callback();
  }

  render() {
    const { classes, onConfirm, i10n } = this.props;
    const {
      oneRowSelected,
      multipleRowsSelected,
      Questions,
      currentItem,
      dialogOpen
    } = this.state;

    return (
      <Container component="main" maxWidth="lg">
        <div className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            {i10n['marketing.feedback-form.title.new']}
          </Typography>
        </div>
        <form className={classes.form} noValidate>
          <Grid container spacing={3}>
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
                  rowData={Questions}
                />
              </div>
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => this.onConfirm(onConfirm)}
              >
                {i10n['global.confirm']}
              </Button>
            </Grid>
          </Grid>
        </form>
        <EditFeedbackFormQuestionDialogTemplate
          open={dialogOpen}
          maxWidth="lg"
          fullWidth
          onConfirm={this.onConfirmItem}
          onCloseClick={this.onCloseMenuItem}
          model={currentItem}
        />
      </Container>
    );
  }
}

export const EditFeedbackFormTemplate = withLocalization(
  withStyles(styles)(EditFeedbackFormTemplateComponent)
);

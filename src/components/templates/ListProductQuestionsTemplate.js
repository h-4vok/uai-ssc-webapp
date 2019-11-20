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

class ListProductQuestionsTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      oneNonRepliedRowSelected: false
    };
  }

  componentDidMount() {
    this.dataGrid.api.sizeColumnsToFit();

    this.dataGrid.api.addEventListener('selectionChanged', this.onRowSelection);
  }

  onRowSelection = e => {
    const selected = e.api.getSelectedRows();

    this.setState({
      oneNonRepliedRowSelected:
        selected.filter(x => !x.RepliedDate).length === 1
    });
  };

  buildTextField = (i10nKey, field) => ({
    headerName: this.props.i10n[i10nKey],
    field,
    filter: true,
    sortable: true
  });

  buildGridDef = i10n => [
    {
      headerName: i10n['global.id'],
      field: 'Id',
      sortable: true,
      filter: true,
      checkboxSelection: true,
      headerCheckboxSelection: true
    },
    this.buildTextField('product-question.field.question-by', 'QuestionBy'),
    this.buildTextField('product-question.field.posted-date', 'PostedDate'),
    this.buildTextField(
      'product-question.field.pricing-plan-name',
      'PricingPlanName'
    ),
    this.buildTextField('product-question.field.replied-date', 'RepliedDate')
  ];

  callWithOne = action => {
    const item = this.dataGrid.api.getSelectedRows()[0];
    const id = item.Id;

    action(id);
  };

  render() {
    const { items, classes, onRefresh, onReplyAction, i10n } = this.props;
    const { oneNonRepliedRowSelected } = this.state;

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
              onClick={() => this.callWithOne(onReplyAction)}
              className={classes.button}
              disabled={!oneNonRepliedRowSelected}
            >
              {i10n['product-question.action.reply']}
            </Button>
          </ButtonBar>

          <div
            className="ag-theme-material"
            style={{ height: 500, width: 1400 }}
          >
            <AgGridReact
              ref={c => (this.dataGrid = c)}
              rowSelection="multiple"
              columnDefs={this.buildGridDef(i10n)}
              rowData={items}
            />
          </div>
        </div>
      </Container>
    );
  }
}

export const ListProductQuestionsTemplate = withLocalization(
  withStyles(styles)(ListProductQuestionsTemplateComponent)
);

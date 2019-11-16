import React, { PureComponent } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react';
import { Container, Grid, Typography, Button } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import withLocalization from '../../localization/withLocalization';

class SendNewsletterTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    const { DateFrom, DateTo, Categories } = this.props.model;

    this.state = { DateFrom, DateTo, Categories };
  }

  componentDidMount() {
    this.dataGrid.api.sizeColumnsToFit();
    this.dataGrid.api.addEventListener('selectionChanged', this.onRowSelection);
    this.onGridReady();
  }

  onRowSelection = e => {
    const selected = e.api.getSelectedRows();
    this.props.model.Categories = selected;
  };

  onGridReady = () => {
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

  onDateChange = name => date => {
    this.props.model[name] = date;
    this.setState({ [name]: date });
  };

  render() {
    const { i10n, onConfirm, categories } = this.props;
    const { DateFrom, DateTo } = this.state;

    return (
      <Container main maxWidth="md">
        <Grid item xs={12}>
          <Typography variant="h4">
            {i10n['send-newsletter.page.title']}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>{i10n['send-newsletter.page.subtitle']}</Typography>
        </Grid>
        <Grid item xs={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              label={i10n['send-newsletter.date-from']}
              format="dd/MM/yyyy"
              value={DateFrom}
              onChange={this.onDateChange('DateFrom')}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              label={i10n['send-newsletter.date-to']}
              format="dd/MM/yyyy"
              value={DateTo}
              onChange={this.onDateChange('DateTo')}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
          </MuiPickersUtilsProvider>
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
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={onConfirm}
          >
            {i10n['global.confirm']}
          </Button>
        </Grid>
      </Container>
    );
  }
}

export const SendNewsletterTemplate = withLocalization(
  SendNewsletterTemplateComponent
);

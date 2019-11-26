import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { Container, Grid, Button } from '@material-ui/core';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { SimpleTextField } from '../atoms';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import withLocalization from '../../localization/withLocalization';

class CheckWorkOrderTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(this.props);

    this.state = {
      barcodeField: ''
    };
  }

  componentDidMount() {
    this.dataGrid.api.sizeColumnsToFit();

    this.dataGrid.api.addEventListener('selectionChanged', this.onRowSelection);
  }

  asTextCell = (field, otherProps) => ({
    headerName: this.props.i10n[`parent-sample-search.grid.${field}`],
    field,
    filter: true,
    sortable: true,
    ...otherProps
  });

  buildGridDef = i10n => [
    {
      headerName: i10n['global.id'],
      field: 'Id',
      filter: true,
      sortable: true,
      width: 150
    },
    this.asTextCell('Checked', {
      valueFormatter: params =>
        params.value ? i10n['check-work-order.checked'] : ''
    }),
    this.asTextCell('Barcode'),
    this.asTextCell('SampleTypeCode'),
    this.asTextCell('AvailableVolume'),
    this.asTextCell('UnitOfMeasureCode')
  ];

  onTextChange = evt => this.setState({ barcodeField: evt.target.value });

  onKeyPress = evt => {
    if (evt.key === 'Enter') {
      this.tryCheckingSample(this.state.barcodeField);
      this.setState({ barcodeField: '' });
    }
  };

  tryCheckingSample = barcode => {
    if (!barcode) {
      this.notifier.warning(this.props.i10n['check-barcode.empty']);
      return;
    }

    const found = this.props.items.find(x => x.Barcode === barcode);
    if (!found) {
      this.notifier.warning(this.props.i10n['check-barcode.not-found']);
      return;
    }

    found.Checked = true;
    this.dataGrid.api.redrawRows();

    this.notifier.success(`${this.props.i10n['check-barcode.success']}: ${barcode}`);
  };

  render() {
    const { i10n, items, onConfirm } = this.props;
    const { barcodeField } = this.state;

    return (
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <SimpleTextField
              fullWidth
              label={i10n['global.scan-barcode']}
              onChange={this.onTextChange}
              onKeyPress={this.onKeyPress}
              value={barcodeField}
            />
          </Grid>
          <Grid item xs={12}>
            <div
              className="ag-theme-material"
              style={{ height: 400, width: 'auto' }}
            >
              <AgGridReact
                ref={c => (this.dataGrid = c)}
                suppressHorizontalScroll
                columnDefs={this.buildGridDef(i10n)}
                rowData={items}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <Button color="primary" variant="contained" onClick={onConfirm}>
              {i10n['global.confirm']}
            </Button>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export const CheckWorkOrderTemplate = withSnackbar(
  withLocalization(CheckWorkOrderTemplateComponent)
);

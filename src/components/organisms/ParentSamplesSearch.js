import React, { PureComponent } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import withLocalization from '../../localization/withLocalization';

class ParentSamplesSearchComponent extends PureComponent {
  componentDidMount() {
    this.dataGrid.api.sizeColumnsToFit();
    this.dataGrid.api.addEventListener('selectionChanged', this.onRowSelection);
  }

  onRowSelection = e => {
    const selected = e.api.getSelectedRows();
    this.props.onParentSelection(selected);
  };

  asTextCell = field => ({
    headerName: this.props.i10n[`parent-sample-search.grid.${field}`],
    field,
    filter: true,
    sortable: true
  });

  buildGridDef = i10n => [
    {
      headerName: i10n['global.id'],
      field: 'Id',
      filter: true,
      sortable: true,
      checkboxSelection: true,
      headerCheckboxSelection: true,
      width: 150
    },
    this.asTextCell('Barcode'),
    this.asTextCell('SampleTypeCode'),
    this.asTextCell('AvailableVolume'),
    this.asTextCell('UnitOfMeasureCode')
  ];

  render() {
    const { samples, i10n } = this.props;

    return (
      <div className="ag-theme-material" style={{ height: 400, width: 'auto' }}>
        <AgGridReact
          ref={c => (this.dataGrid = c)}
          rowSelection="multiple"
          rowMultiSelectWithClick
          rowDeselection
          suppressHorizontalScroll
          columnDefs={this.buildGridDef(i10n)}
          rowData={samples}
        />
      </div>
    );
  }
}

export const ParentSamplesSearch = withLocalization(
  ParentSamplesSearchComponent
);

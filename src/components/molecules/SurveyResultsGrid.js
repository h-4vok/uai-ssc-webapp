import React, { PureComponent } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import withLocalization from '../../localization/withLocalization';

class SurveyResultsGridComponent extends PureComponent {
  buildGridDef = i10n => [
    {
      headerName: i10n['survey-form.question-title'],
      field: 'Label',
      sortable: true,
      filter: true
    },
    {
      headerName: i10n['global.percentage'],
      field: 'Percentage',
      sortable: true,
      filter: true,
      valueFormatter: params => `${params.value} %`
    },
    {
      headerName: i10n['global.count'],
      field: 'Count',
      sortable: true,
      filter: true
    }
  ];

  componentDidMount() {
    this.dataGrid.api.sizeColumnsToFit();

    this.dataGrid.api.addEventListener('selectionChanged', this.onRowSelection);
  }

  render() {
    const { i10n, items } = this.props;

    return (
      <div className="ag-theme-material" style={{ height: 300, width: '100%' }}>
        <AgGridReact
          ref={c => (this.dataGrid = c)}
          columnDefs={this.buildGridDef(i10n)}
          rowData={items}
        />
      </div>
    );
  }
}

export const SurveyResultsGrid = withLocalization(SurveyResultsGridComponent);

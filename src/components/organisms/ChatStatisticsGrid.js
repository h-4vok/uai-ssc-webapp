import React, { PureComponent } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import withLocalization from '../../localization/withLocalization';

class ChatStatisticsGridComponent extends PureComponent {
  buildGridDef = i10n => [
    {
      headerName: i10n['chat-stats.grid.start-date'],
      field: 'StartDate',
      sortable: true,
      filter: true
    },
    {
      headerName: i10n['chat-stats.grid.reply-date'],
      field: 'ReplyDate',
      sortable: true,
      filter: true
    },
    {
      headerName: i10n['chat-stats.grid.has-reply'],
      field: 'HasReply',
      sortable: true,
      filter: true,
      valueFormatter: ({ value }) =>
        value ? i10n['global.yes'] : i10n['global.no']
    },
    {
      headerName: i10n['chat-stats.grid.effectivity'],
      field: 'EffectivityPercentage',
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
      <div className="ag-theme-material" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          ref={c => (this.dataGrid = c)}
          columnDefs={this.buildGridDef(i10n)}
          rowData={items}
        />
      </div>
    );
  }
}

export const ChatStatisticsGrid = withLocalization(ChatStatisticsGridComponent);

import React, { PureComponent } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Container from '@material-ui/core/Container';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import withLocalization from '../../localization/withLocalization';

class ProductCompareTemplateComponent extends PureComponent {
  buildOneRow = (featurei10n, products, dataField) => {
    const row = {
      FeatureDescription: this.props.i10n[featurei10n]
    };

    products.forEach(
      item =>
        (row[item.Code] = item[dataField] || this.props.i10n['global.no-limit'])
    );

    return row;
  };

  buildRows = products => {
    const rows = [];

    const metadata = [
      ['product-compare.grid.row.user-limit', 'UserLimit'],
      ['product-compare.grid.row.patient-sample-limit', 'PatientSampleLimit'],
      ['product-compare.grid.row.control-sample-limit', 'ControlSampleLimit'],
      ['product-compare.grid.row.run-limit', 'ClinicRehearsalLimit'],
      ['product-compare.grid.row.price', 'Price']
    ];

    metadata.forEach(meta =>
      rows.push(this.buildOneRow(meta[0], products, meta[1]))
    );

    return rows;
  };

  buildGridDef = (i10n, products) => {
    const columns = [];

    const featureColumn = {
      headerName: i10n['product-compare.grid.feature'],
      field: 'FeatureDescription',
      width: 400
    };
    columns.push(featureColumn);

    const productColumns = products.map(item => ({
      headerName: item.Name,
      field: item.Code
    }));
    columns.push(...productColumns);

    return columns;
  };

  render() {
    const { products, i10n } = this.props;

    const normalizedRows = this.buildRows(products);

    return (
      <Container main maxWidth="lg">
        <div className="ag-theme-material" style={{ height: 500, width: 1024 }}>
          <AgGridReact
            columnDefs={this.buildGridDef(i10n, products)}
            rowData={normalizedRows}
          />
        </div>
      </Container>
    );
  }
}

export const ProductCompareTemplate = withLocalization(
  ProductCompareTemplateComponent
);

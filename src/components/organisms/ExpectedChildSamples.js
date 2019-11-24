import React, { PureComponent } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Container, Button } from '@material-ui/core';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import {
  ButtonBar,
  CustomContentDialog,
  EditExpectedChildPopup
} from '../molecules';
import withLocalization from '../../localization/withLocalization';

class ExpectedChildSamplesComponent extends PureComponent {
  constructor(props) {
    super(props);

    const items = this.prepareParentSamples(this.props.ParentSamples);
    this.props.onExpectedChildsSetup(items);

    this.state = {
      oneRowSelected: false,
      editDialogOpen: false,
      selectedItemToEdit: null
    };
  }

  componentDidMount() {
    this.dataGrid.api.sizeColumnsToFit();

    this.dataGrid.api.addEventListener('selectionChanged', this.onRowSelection);
  }

  onRowSelection = e => {
    const selected = e.api.getSelectedRows();

    this.setState({
      oneRowSelected: selected.length === 1
    });
  };

  asTextCell = (field, otherProps) => ({
    headerName: this.props.i10n[`expected-child-sample.grid.${field}`],
    field,
    ...otherProps
  });

  buildGridDef = i10n => [
    {
      headerName: i10n['expected-child-sample.grid.parent-barcode'],
      field: 'ParentBarcode',
      checkboxSelection: true,
      width: 250
    },
    this.asTextCell('ExpectedChildQuantity'),
    this.asTextCell('DilutionFactor'),
    this.asTextCell('ResultingVolume', { width: 300 }),
    this.asTextCell('UnitOfMeasureCode')
  ];

  onEdit = () => {
    const item = this.dataGrid.api.getSelectedRows()[0];
    this.setState({
      editDialogOpen: true,
      selectedItemToEdit: item
    });
  };

  prepareParentSamples = ParentSamples => {
    return ParentSamples.map(parent => ({
      ParentBarcode: parent.Barcode,
      ExpectedChildQuantity: null,
      DilutionFactor: null,
      ResultingVolume: 0,
      UnitOfMeasureCode: parent.UnitOfMeasureCode
    }));
  };

  onEditClose = () => {
    this.setState({ editDialogOpen: false }, () => {
      this.dataGrid.api.redrawRows();
      const items = [];

      this.dataGrid.api.forEachNode(node => items.push(node.data));
      this.props.onExpectedChildsSetup(items);
    });
  };

  render() {
    const { ParentSamples, i10n } = this.props;
    const { oneRowSelected, selectedItemToEdit, editDialogOpen } = this.state;

    const items = this.prepareParentSamples(ParentSamples);

    return (
      <Container>
        <ButtonBar>
          <Button
            color="primary"
            variant="contained"
            onClick={this.onEdit}
            disabled={!oneRowSelected}
          >
            {i10n['expected-child.action.edit']}
          </Button>
        </ButtonBar>
        <div
          className="ag-theme-material"
          style={{ height: 400, width: 'auto' }}
        >
          <AgGridReact
            ref={c => (this.dataGrid = c)}
            rowSelection="single"
            rowMultiSelectWithClick
            rowDeselection
            suppressHorizontalScroll
            columnDefs={this.buildGridDef(i10n)}
            rowData={items}
          />
        </div>
        <CustomContentDialog
          onClose={this.onEditClose}
          open={editDialogOpen}
          maxWidth="md"
          fullWidth
          onConfirm={this.onEditClose}
        >
          {editDialogOpen && (
            <EditExpectedChildPopup model={selectedItemToEdit} />
          )}
        </CustomContentDialog>
      </Container>
    );
  }
}

export const ExpectedChildSamples = withLocalization(
  ExpectedChildSamplesComponent
);

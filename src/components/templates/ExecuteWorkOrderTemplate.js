import React, { PureComponent } from 'react';
import { Container, Grid, Button } from '@material-ui/core';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { CustomContentDialog, EditAliquotPopup } from '../molecules';
import withLocalization from '../../localization/withLocalization';

class ExecuteWorkOrderTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

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
    headerName: this.props.i10n[`execute-work-order.grid.${field}`],
    field,
    ...otherProps
  });

  buildGridDef = () => [
    this.asTextCell('ParentBarcode', { checkboxSelection: true, width: 300 }),
    this.asTextCell('ChildBarcode', { width: 300 }),
    this.asTextCell('DilutionFactor'),
    this.asTextCell('VolumeToUse', { width: 150 }),
    this.asTextCell('ResultingVolume', { width: 150 }),
    this.asTextCell('UnitOfMeasureCode', { width: 150 }),
    this.asTextCell('UsedParentVolume', { width: 150 }),
    this.asTextCell('FinalChildVolume', { width: 150 })
  ];

  onEdit = () => {
    const item = this.dataGrid.api.getSelectedRows()[0];
    this.setState({
      editDialogOpen: true,
      selectedItemToEdit: item
    });
  };

  onEditClose = () => {
    this.setState({ editDialogOpen: false }, () => {
      this.dataGrid.api.redrawRows();
    });
  };

  render() {
    const { i10n, expectedSamples, onComplete, onPrintLabels } = this.props;
    const { oneRowSelected, editDialogOpen, selectedItemToEdit } = this.state;

    return (
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Button
              color="primary"
              variant="contained"
              onClick={this.onEdit}
              disabled={!oneRowSelected}
            >
              {i10n['execute-work-order.aliquot']}
            </Button>
          </Grid>
          <Grid item xs={12}>
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
                rowData={expectedSamples}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <Button
              color="primary"
              variant="contained"
              onClick={onPrintLabels}
              disabled={!oneRowSelected}
            >
              {i10n['execute-work-order.print-aliquot-labels']}
            </Button>
            <Button
              fullWidth
              onClick={onComplete}
              color="primary"
              variant="contained"
            >
              {i10n['work-order.action.complete']}
            </Button>
          </Grid>
        </Grid>
        <CustomContentDialog
          onClose={this.onEditClose}
          open={editDialogOpen}
          maxWidth="md"
          fullWidth
          onConfirm={this.onEditClose}
        >
          {editDialogOpen && <EditAliquotPopup model={selectedItemToEdit} />}
        </CustomContentDialog>
      </Container>
    );
  }
}

export const ExecuteWorkOrderTemplate = withLocalization(
  ExecuteWorkOrderTemplateComponent
);

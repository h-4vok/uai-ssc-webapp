import React, { PureComponent } from 'react';
import { Grid, Container } from '@material-ui/core';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react';
import { SimpleTextField, SimpleSelect } from '../atoms';
import withLocalization from '../../localization/withLocalization';

class EditMenuItemFormComponent extends PureComponent {
  constructor(props) {
    super(props);

    const { MenuOrder = 0, RelativeRoute, TranslationKey } = this.props.model;

    this.state = {
      MenuOrder,
      RelativeRoute,
      TranslationKey
    };
  }

  buildGridDef = i10n => [
    {
      headerName: i10n['security.editRole.grid.id'],
      field: 'Id',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      width: 200
    },
    {
      headerName: i10n['global.code'],
      field: 'Code',
      width: 400
    },
    {
      headerName: i10n['security.editRole.grid.name'],
      field: 'Name',
      width: 600
    }
  ];

  componentDidMount() {
    this.dataGrid.api.sizeColumnsToFit();
    this.dataGrid.api.addEventListener('selectionChanged', this.onRowSelection);
    this.onGridReady();
  }

  onRowSelection = e => {
    const selected = e.api.getSelectedRows();
    this.props.model.RequiredPermissions = selected;
  };

  onGridReady = () => {
    if (!this.props.isEditAction) return;

    const isSelectedPermission = id =>
      this.state.Permissions.some(
        selectedPermission => selectedPermission.Id === id
      );

    this.dataGrid.api.forEachNode(node => {
      if (isSelectedPermission(node.data.Id)) {
        node.setSelected(true);
      }
    });
  };

  onInputChange = event => {
    this.props.model[event.target.name] = event.target.value;
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { i10n, translationKeys, permissions } = this.props;
    const { MenuOrder, RelativeRoute, TranslationKey } = this.state;

    return (
      <Container main maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <SimpleTextField
              required
              maxLength="500"
              id="RelativeRoute"
              name="RelativeRoute"
              label={i10n['platform-menu-item.relative-route']}
              fullWidth
              value={RelativeRoute}
              onChange={this.onInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <SimpleTextField
              required
              id="MenuOrder"
              name="MenuOrder"
              type="number"
              inputProps={{ min: 0, max: 100 }}
              label={i10n['platform-menu.menu-order']}
              fullWidth
              value={MenuOrder}
              onChange={this.onInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <SimpleSelect
              required
              name="TranslationKey"
              label={i10n['platform-menu.translation-key']}
              fullWidth
              items={translationKeys}
              value={TranslationKey}
              onChange={this.onInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <div
              className="ag-theme-material"
              style={{ height: 400, width: 'auto' }}
            >
              <AgGridReact
                ref={c => (this.dataGrid = c)}
                rowSelection="multiple"
                suppressHorizontalScroll
                columnDefs={this.buildGridDef(i10n)}
                rowData={permissions}
              />
            </div>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export const EditMenuItemForm = withLocalization(EditMenuItemFormComponent);

import React, { PureComponent } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react';
import { Container, Grid, Typography, Button } from '@material-ui/core';
import withLocalization from '../../localization/withLocalization';
import { SimpleTextField } from '../atoms';

class SubscribeToNewsletterTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { Email: '', SelectedCategories: [] };
  }

  onInputChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  componentDidMount() {
    this.dataGrid.api.sizeColumnsToFit();
    this.dataGrid.api.addEventListener('selectionChanged', this.onRowSelection);
  }

  onRowSelection = e => {
    const selected = e.api.getSelectedRows();
    this.setState({ SelectedCategories: selected });
  };

  buildGridDef = i10n => [
    {
      headerName: i10n['global.description'],
      field: 'Description',
      checkboxSelection: true,
      headerCheckboxSelection: true
    }
  ];

  render() {
    const { i10n, onConfirm, categories } = this.props;
    const { Email, SelectedCategories } = this.state;

    return (
      <Container main maxWidth="xs">
        <Grid item xs={12}>
          <Typography variant="h4">
            {i10n['subscribe-newsletter.title']}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>{i10n['subscribe-newsletter.subttitle']}</Typography>
        </Grid>
        <Grid item xs={12}>
          <SimpleTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Email"
            label={i10n['subscribe-newsletter.email']}
            name="Email"
            autoComplete="email"
            autoFocus
            value={Email}
            onChange={this.onInputChange}
          />
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
            onClick={() => onConfirm(Email, SelectedCategories)}
          >
            {i10n['global.confirm']}
          </Button>
        </Grid>
      </Container>
    );
  }
}

export const SubscribeToNewsletterTemplate = withLocalization(
  SubscribeToNewsletterTemplateComponent
);

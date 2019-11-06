import React, { PureComponent } from 'react';
import { Container, Grid, Button } from '@material-ui/core';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { SimpleTextField } from '../atoms';
import withLocalization from '../../localization/withLocalization';
import withSecuredMenu from '../../securedMenu/withSecuredMenu';

class SearchBackOfficeTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: ''
    };
  }

  componentDidMount() {
    this.dataGrid.api.sizeColumnsToFit();
    this.dataGrid.api.addEventListener('rowClicked', this.onRowClicked);
  }

  onInputChange = e => this.setState({ [e.target.name]: e.target.value });

  pageTitleFormatter = (i10n, params) => i10n[params.value];

  buildGridDef = i10n => [
    {
      headerName: i10n['platform-menu-item.grid.page-title'],
      field: 'TranslationKey',
      sortable: true,
      filter: true,
      valueFormatter: params => this.pageTitleFormatter(i10n, params)
    }
  ];

  onRowClicked = ({ data }) => this.props.onReRoute(data.RelativeRoute);

  render() {
    const { i10n, onSearch, searchData } = this.props;
    const { searchTerm } = this.state;

    const gridOptions = {
      rowStyle: {
        cursor: 'pointer'
      }
    };

    return (
      <Container main maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <SimpleTextField
              maxLength="200"
              id="searchTerm"
              name="searchTerm"
              label={i10n['search-back-office.search-term-input']}
              fullWidth
              value={searchTerm}
              onChange={this.onInputChange}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              onClick={() => onSearch(searchTerm)}
            >
              {i10n['global.search']}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <div
              className="ag-theme-material"
              style={{ height: 400, width: 'auto' }}
            >
              <AgGridReact
                ref={c => (this.dataGrid = c)}
                columnDefs={this.buildGridDef(i10n)}
                rowData={searchData}
                gridOptions={gridOptions}
              />
            </div>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export const SearchBackOfficeTemplate = withSecuredMenu(
  withLocalization(SearchBackOfficeTemplateComponent)
);

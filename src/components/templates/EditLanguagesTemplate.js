import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AgGridReact } from 'ag-grid-react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { SimpleSelect } from '../atoms';
import { ButtonBar } from '../molecules';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
});

class EditLanguagesTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.languages = this.props.languages;

    this.state = {
      selectedLanguage: null,
      languageItems: this.buildLanguages(),
      oneRowSelected: false
    };
  }

  buildLanguages = () =>
    this.languages.map(item => ({ value: item.Id, label: item.Name, item }));

  buildGridDef = () => [
    {
      headerName: 'Clave',
      field: 'Key',
      sortable: true,
      filter: true,
      checkboxSelection: true,
      headerCheckboxSelection: false,
      maxWidth: 400,
      width: 400
    },
    {
      headerName: 'Traducción',
      field: 'Translation',
      sortable: true,
      filter: true
    }
  ];

  onSelectedLanguageChange = event => {
    const selectedLanguageId = event.target.value;
    const selectedLanguage = this.languages.find(
      x => x.Id === selectedLanguageId
    );

    const languageEntries = selectedLanguage ? selectedLanguage.Entries : null;
    this.setState(
      {
        selectedLanguage,
        languageEntries
      },
      () => {
        if (selectedLanguage) this.onGridRefresh();
      }
    );
  };

  onGridRefresh() {
    this.dataGrid.api.sizeColumnsToFit();

    this.dataGrid.api.addEventListener('selectionChanged', this.onRowSelection);
  }

  onRowSelection = e => {
    const selected = e.api.getSelectedRows();

    this.setState({
      oneRowSelected: selected.length === 1
    });
  };

  callEdit = onEditAction => {
    const item = this.dataGrid.api.getSelectedRows()[0];
    const id = item.Id;

    onEditAction(id);
  };

  render() {
    const { classes, onEditAction } = this.props;
    const {
      selectedLanguage,
      languageEntries,
      languageItems,
      oneRowSelected
    } = this.state;

    return (
      <Container component="main" maxWidth="md">
        <div className={classes.paper}>
          <SimpleSelect
            required
            name="selectedLanguage"
            label="Idioma"
            fullWidth
            items={languageItems}
            value={selectedLanguage}
            onChange={this.onSelectedLanguageChange}
          />
          <ButtonBar>
            <Button
              variant="contained"
              onClick={() => this.callEdit(onEditAction)}
              className={classes.button}
              disabled={!oneRowSelected}
            >
              Editar
            </Button>
          </ButtonBar>
        </div>
        <div className="ag-theme-material" style={{ height: 500, width: 1024 }}>
          {selectedLanguage && (
            <AgGridReact
              ref={c => (this.dataGrid = c)}
              rowSelection="single"
              columnDefs={this.buildGridDef()}
              rowData={languageEntries}
            />
          )}
        </div>
      </Container>
    );
  }
}

export const EditLanguagesTemplate = withStyles(styles)(
  EditLanguagesTemplateComponent
);

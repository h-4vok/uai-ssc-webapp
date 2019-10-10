import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AgGridReact } from 'ag-grid-react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { SimpleSelect } from '../atoms';

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
      selectedLanguage: null
    };
  }

  buildGridDef = () => [
    {
      headerName: 'Clave',
      field: 'EntryKey',
      sortable: true,
      filter: true,
      checkboxSelection: true,
      headerCheckboxSelection: false
    },
    {
      headerName: 'Traducción',
      field: 'Translation',
      sortable: true,
      filter: true
    }
  ];

  onSelectedLanguageChange = event => {
    const selectedLanguage = event.target.value;
    const languageEntries = selectedLanguage.Entries;
    this.setState({
      selectedLanguage,
      languageEntries
    });
  };

  render() {
    const { classes, languages } = this.props;
    const { selectedLanguage, languageEntries } = this.state;

    return (
      <Container component="main" maxWidth="md">
        <div className={classes.paper}>
          <SimpleSelect
            required
            name="selectedLanguage"
            label="Idioma"
            fullWidth
            items={languages}
            value={selectedLanguage}
            onChange={this.onSelectedLanguageChange}
          />
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

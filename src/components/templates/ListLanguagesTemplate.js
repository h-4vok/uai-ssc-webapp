import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AgGridReact } from 'ag-grid-react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { SimpleSelect } from '../atoms';
import { ButtonBar } from '../molecules';
import withLocalization from '../../localization/withLocalization';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
});

class ListLanguagesTemplateComponent extends PureComponent {
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

  buildGridDef = i10n => {
    return [
      {
        headerName: i10n['configuration.language.grid.key'],
        field: 'Key',
        sortable: true,
        filter: true,
        checkboxSelection: true,
        headerCheckboxSelection: false,
        maxWidth: 400,
        width: 400
      },
      {
        headerName: i10n['configuration.language.grid.translation'],
        field: 'Translation',
        sortable: true,
        filter: true
      }
    ];
  };

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

        this.setState({ oneRowSelected: false });
      }
    );
  };

  onGridRefresh() {
    this.dataGrid.api.sizeColumnsToFit();

    this.dataGrid.api.addEventListener('selectionChanged', this.onRowSelection);
    this.dataGrid.api.addEventListener('gridColumnsChanged', () =>
      this.dataGrid.api.sizeColumnsToFit()
    );
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
    const { classes, onEditAction, i10n } = this.props;
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
            label={i10n['configuration.language.language']}
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
              {i10n['configuration.language.edit']}
            </Button>
          </ButtonBar>
        </div>
        <div className="ag-theme-material" style={{ height: 500, width: 1024 }}>
          {selectedLanguage && (
            <AgGridReact
              ref={c => (this.dataGrid = c)}
              rowSelection="single"
              columnDefs={this.buildGridDef(i10n)}
              rowData={languageEntries}
            />
          )}
        </div>
      </Container>
    );
  }
}

export const ListLanguagesTemplate = withLocalization(
  withStyles(styles)(ListLanguagesTemplateComponent)
);

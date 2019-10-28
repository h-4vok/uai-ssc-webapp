import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withLocalization from '../../localization/withLocalization';
import { SimpleSelect, SimpleTextField } from '../atoms';

const styles = theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

class EditSampleTypeParameterTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    const {
      Code,
      DefaultDescription,
      DataType,
      DecimalDigits,
      MinimumRange,
      MaximumRange,
      UnitOfMeasure
    } = this.props.model;

    this.state = {
      Code,
      DefaultDescription,
      DataType,
      DecimalDigits,
      MinimumRange,
      MaximumRange,
      UnitOfMeasure,
      dataTypes: this.buildDataTypes(this.props.dataTypes),
      unitOfMeasures: this.buildUnitOfMeasures(this.props.unitOfMeasures)
    };
  }

  buildDataTypes = items =>
    items.map(item => ({ value: item.Id, label: item.Code }));

  buildUnitOfMeasures = items =>
    items.map(item => ({
      value: item.Id,
      label: this.props.i10n[
        `configuration.unit-of-measure.description[${item.Code}]`
      ]
    }));

  isEditAction() {
    return this.props.model && this.props.model.Id;
  }

  onInputChange = event => {
    const numberFields = ['DecimalDigits', 'MaximumRange', 'MinimumRange'];
    const { value } = event.target;

    if (numberFields.some(x => x === event.target.name)) {
      const digitsOnly = /[0-9]/g;
      if (!digitsOnly.test(value)) {
        return;
      }
    }

    this.props.model[event.target.name] = value;
    this.setState({ [event.target.name]: value });
  };

  onSelectedDataTypeChange = event => {
    const selectedId = event.target.value;
    const selectedItem = this.props.dataTypes.find(x => x.Id === selectedId);

    this.props.model.DataType = selectedItem;
    this.setState({
      DataType: selectedItem
    });
  };

  onSelectedUnitOfMeasureChange = event => {
    const selectedId = event.target.value;
    const selectedItem = this.props.unitOfMeasures.find(
      x => x.Id === selectedId
    );

    this.props.model.UnitOfMeasure = selectedItem;
    this.setState({
      UnitOfMeasure: selectedItem
    });
  };

  render() {
    const { classes, onConfirm, i10n } = this.props;
    const {
      Code,
      DefaultDescription,
      DataType,
      DecimalDigits,
      MinimumRange,
      MaximumRange,
      UnitOfMeasure,
      dataTypes,
      unitOfMeasures
    } = this.state;

    return (
      <Container component="main" maxWidth="lg">
        <div className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            {this.props.modelId
              ? i10n['configuration.sample-type-parameter.title.edit']
              : i10n['configuration.sample-type-parameter.title.new']}
          </Typography>
        </div>
        <form className={classes.form} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <SimpleTextField
                required
                maxLength="100"
                id="Code"
                name="Code"
                label={i10n['global.code']}
                fullWidth
                value={Code}
                onChange={this.onInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <SimpleTextField
                required
                maxLength="300"
                id="DefaultDescription"
                name="DefaultDescription"
                label={i10n['global.description']}
                fullWidth
                value={DefaultDescription}
                onChange={this.onInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <SimpleSelect
                required
                name="DataType"
                label={i10n['model.parameter-data-type']}
                fullWidth
                items={dataTypes}
                value={DataType && DataType.Id}
                onChange={this.onSelectedDataTypeChange}
              />
            </Grid>

            <Grid item xs={12}>
              <SimpleTextField
                required
                id="DecimalDigits"
                name="DecimalDigits"
                type="number"
                inputProps={{ min: 0, max: 10 }}
                disabled={!(DataType && DataType.Code === 'DECIMAL')}
                label={i10n['model.sample-type-parameter.decimal-digits']}
                fullWidth
                value={DecimalDigits}
                onChange={this.onInputChange}
              />
            </Grid>

            <Grid item xs={6}>
              <SimpleTextField
                required
                id="MinimumRange"
                name="MinimumRange"
                type="number"
                inputProps={{ min: -999999, max: 999999 }}
                label={i10n['model.sample-type-parameter.minimum-range']}
                fullWidth
                value={MinimumRange}
                onChange={this.onInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <SimpleTextField
                required
                id="Maxi"
                name="MaximumRange"
                type="number"
                inputProps={{ min: -999999, max: 999999 }}
                label={i10n['model.sample-type-parameter.maximum-range']}
                fullWidth
                value={MaximumRange}
                onChange={this.onInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <SimpleSelect
                required
                name="UnitOfMeasure"
                label={i10n['model.unit-of-measure']}
                fullWidth
                items={unitOfMeasures}
                value={UnitOfMeasure && UnitOfMeasure.Id}
                onChange={this.onSelectedUnitOfMeasureChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={onConfirm}
              >
                {i10n['global.confirm']}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    );
  }
}

export const EditSampleTypeParameterTemplate = withLocalization(
  withStyles(styles)(EditSampleTypeParameterTemplateComponent)
);

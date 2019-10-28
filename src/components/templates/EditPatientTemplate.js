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

class EditPatientTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    const { PatientType, Name } = this.props.model;

    this.state = {
      PatientType,
      Name,
      patientTypes: this.buildPatientTypes(this.props.patientTypes)
    };
  }

  buildPatientTypes = items =>
    items.map(item => ({ value: item.Id, label: item.Description }));

  isEditAction() {
    return this.props.model && this.props.model.Id;
  }

  onInputChange = event => {
    this.props.model[event.target.name] = event.target.value;
    this.setState({ [event.target.name]: event.target.value });
  };

  onSelectedPatientTypeChanged = event => {
    const selectedId = event.target.value;
    const selectedItem = this.props.patientTypes.find(x => x.Id === selectedId);

    this.props.model.PatientType = selectedItem;
    this.setState({
      PatientType: selectedItem
    });
  };

  render() {
    const { classes, onConfirm, i10n } = this.props;
    const { Name, PatientType, patientTypes } = this.state;

    return (
      <Container component="main" maxWidth="md">
        <div className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            {this.props.modelId
              ? i10n['inventory.patient.title.edit']
              : i10n['inventory.patient.title.new']}
          </Typography>
        </div>
        <form className={classes.form} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <SimpleSelect
                required
                name="PatientType"
                label={i10n['model.patient-type']}
                fullWidth
                items={patientTypes}
                value={PatientType && PatientType.Id}
                onChange={this.onSelectedPatientTypeChanged}
              />
            </Grid>

            <Grid item xs={12}>
              <SimpleTextField
                required
                maxLength="500"
                id="Name"
                name="Name"
                label={i10n['global.name']}
                fullWidth
                value={Name}
                onChange={this.onInputChange}
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

export const EditPatientTemplate = withLocalization(
  withStyles(styles)(EditPatientTemplateComponent)
);

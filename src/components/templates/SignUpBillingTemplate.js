import React, { PureComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Container, CssBaseline } from '@material-ui/core';
import { SimpleSelect, SimpleTextField } from '../atoms';

const provinces = [
  'Ciudad Autónoma de Buenos Aires',
  'Buenos Aires',
  'Catamarca',
  'Chaco',
  'Chubut',
  'Córdoba',
  'Corrientes',
  'Entre Ríos',
  'Formosa',
  'Jujuy',
  'La Pampa',
  'La Rioja',
  'Mendoza',
  'Neuquén',
  'Río Negro',
  'Salta',
  'San Juan',
  'Santa Cruz',
  'Santa Fe',
  'Santiago del Estero',
  'Tierra del Fuego',
  'Tucumán'
];

const provincesItems = [];

for (let i = 0; i < provinces.length; i++) {
  provincesItems.push({ value: i + 1, label: provinces[i] });
}

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(2),
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

class SignUpBillingTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    const {
      billingCompanyName,
      billingCompanyIdentification,
      billingProvince,
      billingCity,
      billingStreet,
      billingStreetNumber,
      billingDepartment,
      billingPostalCode
    } = this.props.model;

    this.state = {
      billingCompanyName,
      billingCompanyIdentification,
      billingProvince,
      billingCity,
      billingStreet,
      billingStreetNumber,
      billingDepartment,
      billingPostalCode
    };
  }

  onInputChange = event => {
    this.props.model[event.target.name] = event.target.value;
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes, onConfirm } = this.props;
    const {
      billingCompanyName,
      billingCompanyIdentification,
      billingProvince,
      billingCity,
      billingStreet,
      billingStreetNumber,
      billingDepartment,
      billingPostalCode
    } = this.state;

    return (
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            Datos de Facturación
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <SimpleTextField
                  required
                  id="billingCompanyName"
                  name="billingCompanyName"
                  label="Denominación Fiscal"
                  fullWidth
                  maxLength="200"
                  value={billingCompanyName}
                  onChange={this.onInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <SimpleTextField
                  required
                  id="billingCompanyIdentification"
                  name="billingCompanyIdentification"
                  label="Número de identificación fiscal"
                  fullWidth
                  maxLength="11"
                  value={billingCompanyIdentification}
                  onChange={this.onInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SimpleSelect
                  required
                  name="billingProvince"
                  label="Provincia"
                  fullWidth
                  items={provincesItems}
                  value={billingProvince}
                  onChange={this.onInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SimpleTextField
                  required
                  id="billingCity"
                  name="billingCity"
                  label="Ciudad"
                  fullWidth
                  maxLength="200"
                  value={billingCity}
                  onChange={this.onInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SimpleTextField
                  required
                  id="billingStreet"
                  name="billingStreet"
                  label="Calle"
                  fullWidth
                  maxLength="500"
                  value={billingStreet}
                  onChange={this.onInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SimpleTextField
                  required
                  id="billingStreetNumber"
                  name="billingStreetNumber"
                  label="Número"
                  fullWidth
                  maxLength="35"
                  value={billingStreetNumber}
                  onChange={this.onInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SimpleTextField
                  required
                  id="billingDepartment"
                  name="billingDepartment"
                  label="Departamento"
                  fullWidth
                  maxLength="35"
                  value={billingDepartment}
                  onChange={this.onInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SimpleTextField
                  required
                  id="billingPostalCode"
                  name="billingPostalCode"
                  label="Código Postal"
                  fullWidth
                  maxLength="35"
                  value={billingPostalCode}
                  onChange={this.onInputChange}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onConfirm}
            >
              Continuar
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

export const SignUpBillingTemplate = withStyles(styles)(
  SignUpBillingTemplateComponent
);

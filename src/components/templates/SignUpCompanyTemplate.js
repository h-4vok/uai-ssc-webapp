import React, { PureComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Container, CssBaseline } from '@material-ui/core';
import { SimpleSelect, RouteLink } from '../atoms';
import { API } from '../../lib/xhr';

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

class SignUpCompanyTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.api = new API(this.props.notifier);

    const {
      companyName,
      province,
      city,
      street,
      streetNumber,
      department,
      postalCode
    } = this.props.model;

    this.state = {
      companyName,
      province,
      city,
      street,
      streetNumber,
      department,
      postalCode,
      provinceItems: [],
      provinceItemsLoaded: false
    };
  }

  componentDidMount() {
    this.api.request
      .get('province')
      .success(res => {
        const provinces = [];

        res.body.Result.forEach(province => {
          const { Id: value, Name: label } = province;
          provinces.push({ value, label });
        });

        this.setState({ provinceItems: provinces, provinceItemsLoaded: true });
      })
      .go();
  }

  onInputChange = event => {
    this.props.model[event.target.name] = event.target.value;
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes, onConfirm } = this.props;
    const {
      companyName,
      province,
      city,
      street,
      streetNumber,
      department,
      postalCode,
      provinceItems,
      provinceItemsLoaded
    } = this.state;

    return (
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            Datos de la compañía
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="companyName"
                  name="companyName"
                  label="Nombre de la empresa"
                  fullWidth
                  maxLength="200"
                  value={companyName}
                  onChange={this.onInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {provinceItemsLoaded && (
                  <SimpleSelect
                    required
                    name="province"
                    label="Provincia"
                    fullWidth
                    items={provinceItems}
                    value={province}
                    onChange={this.onInputChange}
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="Ciudad"
                  fullWidth
                  maxLength="200"
                  value={city}
                  onChange={this.onInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="street"
                  name="street"
                  label="Calle"
                  fullWidth
                  maxLength="500"
                  value={street}
                  onChange={this.onInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="streetNumber"
                  name="streetNumber"
                  label="Número"
                  fullWidth
                  maxLength="35"
                  value={streetNumber}
                  onChange={this.onInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="department"
                  name="department"
                  label="Departamento"
                  fullWidth
                  maxLength="35"
                  value={department}
                  onChange={this.onInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="postalCode"
                  name="postalCode"
                  label="Código Postal"
                  fullWidth
                  inputProps={{ maxLength: 35 }}
                  value={postalCode}
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
            <Grid container justify="flex-end">
              <Grid item>
                <RouteLink link="sign-in" variant="body2">
                  Ya posee una cuenta? Autentíquese.
                </RouteLink>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export const SignUpCompanyTemplate = withStyles(styles)(
  SignUpCompanyTemplateComponent
);

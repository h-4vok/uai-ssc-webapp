import React, { PureComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { SimpleSelect, RouteLink } from '../atoms';
import { API } from '../../lib/xhr';
import withLocalization from '../../localization/withLocalization';

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
    const { classes, onConfirm, i10n } = this.props;
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
        <div className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            {i10n['sign-up--company.page.title']}
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="companyName"
                  name="companyName"
                  label={i10n['sign-up--company.name']}
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
                    label={i10n['sign-up--company.province']}
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
                  label={i10n['sign-up--company.city']}
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
                  label={i10n['sign-up--company.street']}
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
                  label={i10n['sign-up--company.streetNumber']}
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
                  label={i10n['sign-up--company.department']}
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
                  label={i10n['sign-up--company.postalCode']}
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
              {i10n['sign-up--company.continue']}
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

export const SignUpCompanyTemplate = withLocalization(
  withStyles(styles)(SignUpCompanyTemplateComponent)
);

import React, { PureComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { SimpleTextField } from '../atoms';
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

class SignUpPaymentTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    const {
      creditCardNumber,
      creditCardHolder,
      creditCardCcv,
      creditCardExpirationDate
    } = this.props.model;

    this.state = {
      creditCardNumber,
      creditCardHolder,
      creditCardCcv,
      creditCardExpirationDate
    };
  }

  onInputChange = event => {
    this.props.model[event.target.name] = event.target.value;
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes, onConfirm, i10n } = this.props;
    const {
      creditCardNumber,
      creditCardHolder,
      creditCardCcv,
      creditCardExpirationDate
    } = this.state;

    return (
      <Container component="main" maxWidth="md">
        <div className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            {i10n['sign-up--payment-data.page.title']}
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <SimpleTextField
                  required
                  id="creditCardNumber"
                  name="creditCardNumber"
                  label={i10n['sign-up--payment-data.creditCardNumber']}
                  fullWidth
                  maxLength="19"
                  value={creditCardNumber}
                  onChange={this.onInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <SimpleTextField
                  required
                  id="creditCardHolder"
                  name="creditCardHolder"
                  label={i10n['sign-up--payment-data.creditCardHolder']}
                  fullWidth
                  maxLength="200"
                  value={creditCardHolder}
                  onChange={this.onInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SimpleTextField
                  required
                  id="creditCardCcv"
                  name="creditCardCcv"
                  label={i10n['sign-up--payment-data.ccv']}
                  fullWidth
                  maxLength="4"
                  value={creditCardCcv}
                  onChange={this.onInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="creditCardExpirationDate"
                  name="creditCardExpirationDate"
                  label={i10n['sign-up--payment-data.expirationDate']}
                  fullWidth
                  maxLength="4"
                  value={creditCardExpirationDate}
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
              {i10n['sign-up--payment-data.continue']}
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

export const SignUpPaymentTemplate = withLocalization(
  withStyles(styles)(SignUpPaymentTemplateComponent)
);

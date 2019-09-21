import React, { PureComponent } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { RouteLink } from '../atoms';
import { PageLayout } from '../organisms';

import './SignInPage.scss';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

export class SignInPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      signInEnabled: false
    };
  }

  onCaptchaSuccess = () => {
    this.setState({ signInEnabled: true });
  };

  render() {
    const { classes } = this.props;
    const { signInEnabled } = this.state;

    return (
      <PageLayout>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo electronico"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recordar mi cuenta"
              />
              <ReCAPTCHA
                className="recaptcha-wrapper"
                sitekey="6Lf8LrgUAAAAALSADHJAG6aYkrUwlCUAHTY8ZZiY"
                onChange={this.onCaptchaSuccess}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={!signInEnabled}
              >
                Autenticarse
              </Button>
              <Grid container>
                <Grid item xs>
                  <RouteLink blue link="forgot-password" variant="body2">
                    Olvidé mi contraseña
                  </RouteLink>
                </Grid>
                <Grid item>
                  <RouteLink blue link="sign-up--initial" variant="body2">
                    {'Registrar nueva cuenta'}
                  </RouteLink>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </PageLayout>
    );
  }
}

export const SignInPage = withStyles(styles)(SignInPageComponent);

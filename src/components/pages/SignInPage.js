import React, { PureComponent } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
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
import { API } from '../../lib/xhr';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';

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

    this.notifier = new SnackbarVisitor(this.props);

    this.state = {
      signInEnabled: false,
      username: '',
      password: ''
    };
  }

  onSignInConfirm = () => {
    const { username: UserName, password: Password } = this.state;

    if (!UserName) {
      this.notifier.error('Ingrese su correo electrónico.');
      return;
    }

    if (!Password) {
      this.notifier.error('Ingrese su contraseña.');
      return;
    }

    const body = {
      UserName,
      Password
    };

    const api = new API(this.notifier);

    api.request
      .post('authentication', body)
      .success(() => {
        this.props.history.push('/platform-home');
      })
      .go();
  };

  onCaptchaSuccess = () => {
    this.setState({ signInEnabled: true });
  };

  onInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { signInEnabled, username, password } = this.state;

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
                id="username"
                label="Correo electronico"
                name="username"
                autoComplete="email"
                autoFocus
                value={username}
                onChange={this.onInputChange}
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
                value={password}
                onChange={this.onInputChange}
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
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={!signInEnabled}
                onClick={this.onSignInConfirm}
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

export const SignInPage = withSnackbar(withStyles(styles)(SignInPageComponent));

import React, { PureComponent } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { RouteLink } from '../atoms';
import { PageLayout } from '../organisms';
import { API } from '../../lib/xhr';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { GlobalState } from '../../lib/GlobalState';
import withLocalization from '../../localization/withLocalization';

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

class SignInPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(this.props);

    this.state = {
      signInEnabled: true,
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
      .preventDefaultSuccess()
      .success(res => {
        GlobalState.Authorizer.refreshAuthorizations(
          res.body.Result.GrantedPermissions
        );

        GlobalState.History = this.props.history;
        GlobalState.AspNetSession = res.body.Result.SetCookie;
        document.cookie = GlobalState.AspNetSession;

        this.notifier.success(this.props.i10n['welcome-text']);
        this.props.history.push('/platform-home');
      })
      .go();
  };

  onCaptchaChange = success => {
    this.setState({ signInEnabled: success });
  };

  onInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes, i10n } = this.props;
    const { signInEnabled, username, password } = this.state;

    return (
      <PageLayout>
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {i10n['sign-in.page.title']}
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label={i10n['sign-in.email']}
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
                label={i10n['sign-in.password']}
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={this.onInputChange}
              />
              <ReCAPTCHA
                className="recaptcha-wrapper"
                sitekey="6Lf8LrgUAAAAALSADHJAG6aYkrUwlCUAHTY8ZZiY"
                onChange={this.onCaptchaChange}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={!signInEnabled}
                onClick={this.onSignInConfirm}
              >
                {i10n['sign-in.login']}
              </Button>
              <Grid container>
                <Grid item xs>
                  <RouteLink blue link="forgot-password" variant="body2">
                    {i10n['sign-in.forgot-password']}
                  </RouteLink>
                </Grid>
                <Grid item>
                  <RouteLink blue link="sign-up--initial" variant="body2">
                    {i10n['sign-in.sign-up']}
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

export const SignInPage = withLocalization(
  withSnackbar(withStyles(styles)(SignInPageComponent))
);

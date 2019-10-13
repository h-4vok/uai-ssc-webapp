import React, { PureComponent } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { RouteLink, PasswordRequirementsBox } from '../atoms';
import withLocalization from '../../localization/withLocalization';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(2),
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

export class SignUpInitialTemplateClass extends PureComponent {
  constructor(props) {
    super(props);

    const { firstName, lastName, email } = this.props.model;

    this.state = { firstName, lastName, email };
  }

  onInputChange = event => {
    this.props.model[event.target.name] = event.target.value;
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes, onConfirm, i10n } = this.props;
    const { firstName, lastName, email } = this.state;

    return (
      <Container component="main" maxWidth="md">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {i10n['sign-up--initial.page.title']}
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label={i10n['sign-up--initial.name']}
                  autoFocus
                  value={firstName}
                  onChange={this.onInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label={i10n['sign-up--initial.lastName']}
                  name="lastName"
                  autoComplete="lname"
                  value={lastName}
                  onChange={this.onInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label={i10n['sign-up--initial.email']}
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={this.onInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label={i10n['sign-up--initial.password']}
                  type="password"
                  id="password"
                  onChange={this.onInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password2"
                  label={i10n['sign-up--initial.repeatPassword']}
                  type="password"
                  id="password2"
                  onChange={this.onInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <PasswordRequirementsBox />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onConfirm}
            >
              {i10n['sign-up--initial.continue']}
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

export const SignUpInitialTemplate = withLocalization(
  withStyles(styles)(SignUpInitialTemplateClass)
);

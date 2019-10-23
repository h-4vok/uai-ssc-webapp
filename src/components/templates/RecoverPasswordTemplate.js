import React, { PureComponent } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
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

export class RecoverPasswordTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      repeatedPassword: ''
    };
  }

  onInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  callOnConfirm = () =>
    this.props.onConfirm(this.state.password, this.state.repeatedPassword);

  render() {
    const { classes, i10n } = this.props;
    const { password, repeatedPassword } = this.state;

    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {i10n['recover-password.page.title']}
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label={i10n['sign-up--initial.password']}
              type="password"
              id="password"
              value={password}
              onChange={this.onInputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="repeatedPassword"
              label={i10n['sign-up--initial.repeatPassword']}
              type="password"
              id="password"
              value={repeatedPassword}
              onChange={this.onInputChange}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.callOnConfirm}
            >
              {i10n['forgot-password.recover-password']}
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

export const RecoverPasswordTemplate = withLocalization(
  withStyles(styles)(RecoverPasswordTemplateComponent)
);

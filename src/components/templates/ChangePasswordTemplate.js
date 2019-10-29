import React, { PureComponent } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { PasswordRequirementsBox } from '../atoms';
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

class ChangePasswordTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    const { currentPassword, password1, password2 } = this.props.model;

    this.state = { currentPassword, password1, password2 };
  }

  onInputChange = event => {
    this.props.model[event.target.name] = event.target.value;
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes, onConfirm, i10n } = this.props;
    const { currentPassword, password1, password2 } = this.state;

    return (
      <Container component="main" maxWidth="sm">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {i10n['account.change-password.page.title']}
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="currentPassword"
                  label={i10n['change-password.currentPassword']}
                  type="password"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={this.onInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password1"
                  label={i10n['change-password.password1']}
                  type="password"
                  id="password1"
                  value={password1}
                  onChange={this.onInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password2"
                  label={i10n['change-password.password2']}
                  type="password"
                  id="password2"
                  value={password2}
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
              {i10n['global.confirm']}
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

export const ChangePasswordTemplate = withStyles(styles)(
  withLocalization(ChangePasswordTemplateComponent)
);

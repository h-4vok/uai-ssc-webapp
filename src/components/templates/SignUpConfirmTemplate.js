import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { SimpleTextField } from '../atoms';
import { PageLayout } from '../organisms';
import withLocalization from '../../localization/withLocalization';

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
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

class SignUpConfirmTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { verificationCode: null };
  }

  onInputChange = event => {
    this.props.model[event.target.name] = event.target.value;
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes, onConfirm, i10n } = this.props;
    const { verificationCode } = this.state;

    return (
      <PageLayout>
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              {i10n['sign-up--confirm-pending.page.title']}
            </Typography>
            <Typography variant="span">
              {i10n['sign-up--confirm-pending.page.subtitle']}
            </Typography>
            <form className={classes.form} noValidate>
              <SimpleTextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="verificationCode"
                label={i10n['sign-up--confirm-pending.verificationCode']}
                name="verificationCode"
                autoFocus
                maxLength="6"
                value={verificationCode}
                onChange={this.onInputChange}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={onConfirm}
              >
                {i10n['sign-up--confirm-pending.validate']}
              </Button>
            </form>
          </div>
        </Container>
      </PageLayout>
    );
  }
}

export const SignUpConfirmTemplate = withLocalization(
  withStyles(styles)(SignUpConfirmTemplateComponent)
);

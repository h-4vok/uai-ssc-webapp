import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { PageLayout } from '../organisms';
import { RecoverPasswordTemplate } from '../templates';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';
import withLocalization from '../../localization/withLocalization';
import { RecoverPasswordValidator } from '../../models/RecoverPasswordValidator';

class RecoverPasswordPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);

    this.username = this.props.match.params.username;
    this.token = this.props.match.params.token;

    this.state = {
      loaded: false
    };
  }

  componentDidMount() {
    const goToSignIn = () => this.props.history.push('sign-in');

    this.api.request
      .get(`forgotpassword?username=${this.username}&token=${this.token}`)
      .preventDefaultFailure()
      .success(() => {
        this.setState({ loaded: true });
      })
      .failure(() => {
        this.notifier.error(this.props.i10n['forgot-password.token-invalid']);
        goToSignIn();
      })
      .error(() => {
        goToSignIn();
      })
      .go();
  }

  onConfirm = (password, password2) => {
    const model = { password, password2 };

    const validator = new RecoverPasswordValidator(model);
    const validationMsg = validator.validate();
    if (validationMsg !== true) {
      this.notifier.warning(validationMsg);
      return;
    }

    const { username: UserName, token: Token } = this;

    const body = {
      UserName,
      Password: password,
      Token
    };

    this.api.request
      .put('forgotpassword', body, 0)
      .preventDefaultSuccess()
      .success(() => {
        this.notifier.warning(
          this.props.i10n['forgot-password.password-reset-success']
        );
        this.props.history.push('/sign-in');
      })
      .go();
  };

  render() {
    const { loaded } = this.state;

    return (
      <PageLayout>
        {loaded && <RecoverPasswordTemplate onConfirm={this.onConfirm} />}
      </PageLayout>
    );
  }
}

export const RecoverPasswordPage = withLocalization(
  withSnackbar(RecoverPasswordPageComponent)
);

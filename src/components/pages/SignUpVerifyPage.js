import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { PageLayout } from '../organisms';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { buildFullSignUpBody } from '../../models/SignUpDataModel';
import { SignUpStorageKey } from '../../content/StorageKeys';
import { SingleItemSessionStorage } from '../../lib/SingleItemSessionStorage';
import { API } from '../../lib/xhr';
import withLocalization from '../../localization/withLocalization';

class SignUpVerifyPageComponent extends PureComponent {
  storage = new SingleItemSessionStorage(SignUpStorageKey);

  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(this.props);
    this.model = this.storage.get();

    const exitAction = () => {
      this.notifier.error(
        this.props.i10n['validator.ui.sign-up--verify-failed']
      );
      this.props.history.push('/sign-in');
    };

    if (!this.model) {
      exitAction();
      return;
    }

    this.model.verificationCode = this.props.match.params.code;

    if (!this.model.verificationCode) {
      exitAction();
    }
  }

  componentDidMount() {
    if (!this.model) return;
    
    const body = buildFullSignUpBody(this.model);
    const api = new API(this.notifier);

    api.request
      .put('signup', body, 0)
      .preventDefaultSuccess()
      .success(() => {
        this.props.history.push('/sign-in');
      })
      .success(() => {
        this.notifier.success(
          this.props.i10n['validator.ui.sign-up--verify-success']
        );
      })
      .error(() => {
        this.props.history.push('/sign-in');
      })
      .failure(() => {
        this.props.history.push('/sign-in');
      })
      .go();
  }

  render() {
    return <PageLayout />;
  }
}

export const SignUpVerifyPage = withLocalization(
  withSnackbar(SignUpVerifyPageComponent)
);

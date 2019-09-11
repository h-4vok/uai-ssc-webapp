import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { PageLayout } from '../organisms';
import { SignUpInitialTemplate } from '../templates';
import { SingleItemSessionStorage } from '../../lib/SingleItemSessionStorage';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { SignUpStorageKey } from '../../content/StorageKeys';
import { SignUpDataModelValidator, SignUpDataModel } from '../../models';
import { buildInitialSignUpBody } from '../../models/SignUpDataModel';
import { API } from '../../lib/xhr';

class SignUpInitialPageComponent extends PureComponent {
  storage = new SingleItemSessionStorage(SignUpStorageKey);

  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(this.props);
    this.model = this.storage.get();

    if (!this.model) {
      this.model = new SignUpDataModel();
      this.storage.set(this.model);
    }
  }

  onConfirm = () => {
    const validator = new SignUpDataModelValidator(this.model);

    const validationMsg = validator.validate(
      'firstName',
      'lastName',
      'email',
      'password',
      'password2'
    );

    if (validationMsg !== true) {
      this.notifier.warning(validationMsg);
      return;
    }

    const api = new API(this.notifier);
    const body = buildInitialSignUpBody(this.model);

    api.request
      .post('signup', body)
      .preventDefaultSuccess()
      .success(() => {
        this.storage.set(this.model);
        this.props.history.push('/sign-up--company');
      })
      .go();
  };

  render() {
    return (
      <PageLayout>
        <SignUpInitialTemplate model={this.model} onConfirm={this.onConfirm} />
      </PageLayout>
    );
  }
}

export const SignUpInitialPage = withSnackbar(SignUpInitialPageComponent);

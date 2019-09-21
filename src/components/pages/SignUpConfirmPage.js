import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { PageLayout } from '../organisms';
import { SignUpConfirmTemplate } from '../templates';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { buildFullSignUpBody } from '../../models/SignUpDataModel';
import { SignUpStorageKey } from '../../content/StorageKeys';
import { SingleItemSessionStorage } from '../../lib/SingleItemSessionStorage';
import { API } from '../../lib/xhr';

class SignUpConfirmPageComponent extends PureComponent {
  storage = new SingleItemSessionStorage(SignUpStorageKey);

  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(this.props);
    this.model = this.storage.get();

    if (!this.model) {
      this.history.push('/sign-up--initial');
    }
  }

  onConfirm = () => {
    const body = buildFullSignUpBody(this.model);
    const api = new API(this.notifier);

    api.request
      .put('signup', body, 0)
      .success(() => {
        this.props.history.push('/sign-in');
      })
      .go();
  };

  render() {
    return (
      <PageLayout>
        <SignUpConfirmTemplate model={this.model} onConfirm={this.onConfirm} />
      </PageLayout>
    );
  }
}

export const SignUpConfirmPage = withSnackbar(SignUpConfirmPageComponent);

import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { PageLayout } from '../organisms';
import { SignUpPricingTemplate } from '../templates';
import { SingleItemSessionStorage } from '../../lib/SingleItemSessionStorage';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { SignUpStorageKey } from '../../content/StorageKeys';

class SignUpPricingPageComponent extends PureComponent {
  storage = new SingleItemSessionStorage(SignUpStorageKey);

  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(this.props);
    this.model = this.storage.get();

    if (!this.model) {
      this.history.push('/sign-up--payment-data');
    }
  }

  onConfirm = () => {};

  render() {
    return (
      <PageLayout>
        <SignUpPricingTemplate
          history={this.props.history}
          model={this.model}
          onConfirm={this.onConfirm}
        />
      </PageLayout>
    );
  }
}

export const SignUpPricingPage = withSnackbar(SignUpPricingPageComponent);

import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { PageLayout } from '../organisms';
import { SignUpBillingTemplate } from '../templates';
import { SingleItemSessionStorage } from '../../lib/SingleItemSessionStorage';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { SignUpStorageKey } from '../../content/StorageKeys';
import { SignUpDataModelValidator } from '../../models';

class SignUpBillingPageComponent extends PureComponent {
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
    const validator = new SignUpDataModelValidator(this.model);

    const validationMsg = validator.validate(
      'billingCompanyName',
      'billingCompanyIdentification',
      'billingProvince',
      'billingCity',
      'billingStreet',
      'billingStreetNumber',
      'billingDepartment',
      'billingPostalCode'
    );

    if (validationMsg !== true) {
      this.notifier.warning(validationMsg);
      return;
    }

    this.storage.set(this.model);
    this.props.history.push('/sign-up--preview');
  };

  render() {
    return (
      <PageLayout>
        <SignUpBillingTemplate model={this.model} onConfirm={this.onConfirm} />
      </PageLayout>
    );
  }
}

export const SignUpBillingPage = withSnackbar(SignUpBillingPageComponent);
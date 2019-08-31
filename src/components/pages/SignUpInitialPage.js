import React, { PureComponent } from 'react';
import { PageLayout } from '../organisms';
import { SignUpInitialTemplate } from '../templates';
import { SingleItemSessionStorage } from '../../lib/SingleItemSessionStorage';
import { SignUpStorageKey } from '../../content/StorageKeys';

export class SignUpInitialPage extends PureComponent {
  storage = new SingleItemSessionStorage(SignUpStorageKey);

  model = this.storage.get();

  onConfirm = () => {
    // TODO: Validate

    this.storage.set(this.model);

    this.props.history.push('/sign-up-company');
  };

  render() {
    return (
      <PageLayout>
        <SignUpInitialTemplate model={this.model} onConfirm={this.onConfirm} />
      </PageLayout>
    );
  }
}

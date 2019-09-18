import React, { PureComponent } from 'react';
// import { withSnackbar } from 'notistack';
import { PageLayout } from '../organisms';
import { SignUpConfirmTemplate } from '../templates';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
// import { API } from '../../lib/xhr';

export class SignUpConfirmPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(this.props);
  }

  onConfirm = () => {};

  render() {
    return (
      <PageLayout>
        <SignUpConfirmTemplate model={this.model} onConfirm={this.onConfirm} />
      </PageLayout>
    );
  }
}

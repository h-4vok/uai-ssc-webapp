import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';
import { PlatformPageLayout } from '../organisms';
import { DoRestoreFromTemplate } from '../templates';

class DoRestoreFromPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);

    this.state = {
      model: {
        File: null
      }
    };
  }

  onConfirm = () => {
    this.api.request
      .post('restore', this.state.model.File)
      .success(() => this.props.history.push('/security/backup'))
      .go();
  };

  render() {
    const { model } = this.state;

    return (
      <PlatformPageLayout>
        <DoRestoreFromTemplate model={model} onConfirm={this.onConfirm} />
      </PlatformPageLayout>
    );
  }
}

export const DoRestoreFromPage = withSnackbar(DoRestoreFromPageComponent);

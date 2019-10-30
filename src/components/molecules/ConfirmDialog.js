import React, { PureComponent } from 'react';
import Button from '@material-ui/core/Button';
import { MessageDialog } from './MessageDialog';
import { fromI10n } from '../../lib/GlobalState';

export class ConfirmDialog extends PureComponent {
  render() {
    const {
      open,
      onClose,
      onConfirm,
      title = 'Confirmación',
      message = '¿Está seguro de realizar esta acción?'
    } = this.props;

    return (
      <MessageDialog
        open={open}
        onClose={onClose}
        title={title}
        message={message}
      >
        <Button onClick={onConfirm} color="primary">
          {fromI10n('global.yes')}
        </Button>
        <Button onClick={onClose} color="primary">
          {fromI10n('global.no')}
        </Button>
      </MessageDialog>
    );
  }
}

import React, { PureComponent } from 'react';
import Button from '@material-ui/core/Button';
import { MessageDialog } from './MessageDialog';

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
          Sí
        </Button>
        <Button onClick={onClose} color="primary">
          No
        </Button>
      </MessageDialog>
    );
  }
}

import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';
import { fromI10n } from '../../lib/GlobalState';

export function CustomContentDialog(props) {
  return (
    <Dialog
      maxWidth={props.maxWidth}
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      <DialogContent>{props.children}</DialogContent>
      <DialogActions>
        <Button onClick={props.onConfirm} color="primary">
          {fromI10n('global.close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

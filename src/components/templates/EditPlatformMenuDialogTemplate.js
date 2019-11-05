import React, { PureComponent } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { EditMenuItemForm } from '../organisms';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import withLocalization from '../../localization/withLocalization';

class EditPlatformMenuDialogTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(this.props);
  }

  validateModelAndConfirm = () => {
    const {
      RelativeRoute,
      MenuOrder,
      TranslationKey,
      RequiredPermissions
    } = this.props.model;
    const { i10n } = this.props;

    // validar codigo
    if (!RelativeRoute) {
      this.notifier.error(i10n['platform-menu-item.validation.relative-route']);
      return;
    }

    // validar menu order
    if (!MenuOrder || !parseInt(MenuOrder)) {
      this.notifier.error(i10n['platform-menu-item.validation.menu-order']);
      return;
    }
    // validar translation key
    if (!TranslationKey) {
      this.notifier.error(
        i10n['platform-menu-item.validation.translation-key']
      );
      return;
    }

    // validar permissions
    if (!RequiredPermissions || !RequiredPermissions.length) {
      this.notifier.error(
        i10n['platform-menu-item.validation.required-permissions']
      );
      return;
    }

    this.props.onConfirm();
  };

  render() {
    const {
      maxWidth,
      open,
      onClose,
      model,
      translationKeys,
      permissions,
      onCloseClick,
      i10n
    } = this.props;

    return (
      <Dialog
        maxWidth={maxWidth}
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {i10n['platform-menu-item.edit.title']}
        </DialogTitle>
        <DialogContent>
          <EditMenuItemForm
            model={model}
            translationKeys={translationKeys}
            permissions={permissions}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => this.validateModelAndConfirm()}
            color="primary"
          >
            {i10n['global.confirm']}
          </Button>
          <Button onClick={onCloseClick} color="primary">
            {i10n['global.close']}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export const EditPlatformMenuDialogTemplate = withLocalization(
  withSnackbar(EditPlatformMenuDialogTemplateComponent)
);

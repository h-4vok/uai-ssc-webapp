import React, { PureComponent } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { EditFeedbackFormQuestionForm } from '../organisms';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import withLocalization from '../../localization/withLocalization';

class EditFeedbackFormQuestionDialogTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(this.props);
  }

  validateModelAndConfirm = () => {
    const { Question, Choices } = this.props.model;
    const { i10n } = this.props;

    // validar codigo
    if (!Question) {
      this.notifier.error(i10n['feedback-form-question.validation.question']);
      return;
    }

    // validar choices
    if (!Choices || !Choices.length || Choices.length < 2) {
      this.notifier.error(i10n['feedback-form-question.validation.choices']);
      return;
    }

    // validar que cada choice tenga texto
    for (let i = 0; i < Choices.length; i++) {
      const item = Choices[i];

      if (!item.ChoiceTitle) {
        this.notifier.error(
          i10n['feedback-form-question.validation.empty-choice']
        );
        return;
      }
    }

    this.props.onConfirm();
  };

  render() {
    const {
      maxWidth,
      fullWidth,
      open,
      onClose,
      model,
      onCloseClick,
      i10n
    } = this.props;

    return (
      <Dialog
        maxWidth={maxWidth}
        fullWidth={fullWidth}
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {i10n['feedback-form-question.edit.title']}
        </DialogTitle>
        <DialogContent>
          <EditFeedbackFormQuestionForm model={model} />
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

export const EditFeedbackFormQuestionDialogTemplate = withLocalization(
  withSnackbar(EditFeedbackFormQuestionDialogTemplateComponent)
);

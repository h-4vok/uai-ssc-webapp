const successMessage = 'La operación ha sido completada exitosamente.';
const errorMessage = 'Ha ocurrido un error.';

const showMessage = (props, message, variant) => {
  props.enqueueSnackbar(message, { variant });
};

export class SnackbarVisitor {
  constructor(componentProps) {
    this.props = componentProps;
  }

  success = message =>
    showMessage(this.props, message || successMessage, 'success');

  error = message => showMessage(this.props, message || errorMessage, 'error');

  warning = message => showMessage(this.props, message, 'warning');
}

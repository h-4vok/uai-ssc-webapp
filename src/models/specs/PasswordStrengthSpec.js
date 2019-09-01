/* eslint-disable no-useless-escape */
import { spec } from './spec';

const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@+#\$%\^&\*])(?=.{8,})/;

export const PasswordStrengthSpec = (model, propName, propLabel) =>
  spec(
    () => !regex.test(model[propName]),
    `El campo ${propLabel} no cumple con las reglas indicadas.`
  );

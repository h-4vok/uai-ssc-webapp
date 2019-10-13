/* eslint-disable no-useless-escape */
import fillTemplate from 'es6-dynamic-template';
import { spec } from './spec';
import { fromI10n } from '../../lib/GlobalState';

const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@+#\$%\^&\*])(?=.{8,})/;

export const PasswordStrengthSpec = (model, propName, propLabel) =>
  spec(
    () => !regex.test(model[propName]),
    fillTemplate(fromI10n('validator.ui.password-strength-spec'), { propLabel })
  );

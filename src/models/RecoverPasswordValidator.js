import * as Specs from './specs';
import { ValidatorVisitor } from './ValidatorVisitor';
import { fromI10n } from '../lib/GlobalState';

export class RecoverPasswordValidator extends ValidatorVisitor {
  validations = {
    password: [
      Specs.MandatoryStringSpec(
        this.model,
        'password',
        fromI10n('sign-up--initial.password')
      ),
      Specs.SameStringSpec(
        this.model,
        'password',
        'password2',
        'Las contraseñas no coinciden.'
      ),
      Specs.PasswordStrengthSpec(
        this.model,
        'password',
        fromI10n('sign-up--initial.password')
      )
    ],
    password2: [
      Specs.MandatoryStringSpec(
        this.model,
        'password2',
        fromI10n('sign-up--initial.password')
      )
    ]
  };
}

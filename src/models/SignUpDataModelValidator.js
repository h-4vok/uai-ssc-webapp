import * as Specs from './specs';
import { ValidatorVisitor } from './ValidatorVisitor';

export class SignUpDataModelValidator extends ValidatorVisitor {
  validations = {
    firstName: [
      Specs.MandatoryStringSpec(this.model, 'firstName', 'Nombre'),
      Specs.StringMaxLengthSpec(this.model, 200, 'firstName', 'Nombre')
    ],
    lastName: [
      Specs.MandatoryStringSpec(this.model, 'lastName', 'Apellido'),
      Specs.StringMaxLengthSpec(this.model, 200, 'lastName', 'Apellido')
    ],
    email: [
      Specs.MandatoryStringSpec(this.model, 'email', 'Correo electrónico'),
      Specs.StringMinLengthSpec(this.model, 6, 'email', 'Correo electrónico'),
      Specs.EmailSpec(this.model, 'email', 'Correo electrónico')
    ],
    password: [
      Specs.MandatoryStringSpec(this.model, 'password', 'Contraseña'),
      Specs.SameStringSpec(
        this.model,
        'password',
        'password2',
        'Las contraseñas no coinciden.'
      ),
      Specs.PasswordStrengthSpec(this.model, 'password', 'Contraseña')
    ],
    password2: [
      Specs.MandatoryStringSpec(this.model, 'password2', 'Contraseña')
    ]
  };
}

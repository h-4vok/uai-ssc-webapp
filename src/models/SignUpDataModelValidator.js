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
    ],
    companyName: [
      Specs.MandatoryStringSpec(
        this.model,
        'companyName',
        'Nombre de la empresa'
      ),
      Specs.StringMaxLengthSpec(
        this.model,
        200,
        'companyName',
        'Nombre de la empresa'
      )
    ],
    province: [
      Specs.MandatorySelectionSpec(this.model, 'province', 'Provincia')
    ],
    city: [
      Specs.MandatoryStringSpec(this.model, 'city', 'Ciudad'),
      Specs.StringMaxLengthSpec(this.model, 200, 'city', 'Ciudad')
    ],
    street: [
      Specs.MandatoryStringSpec(this.model, 'street', 'Calle'),
      Specs.StringMaxLengthSpec(this.model, 500, 'street', 'Calle')
    ],
    streetNumber: [
      Specs.MandatoryStringSpec(this.model, 'streetNumber', 'Número'),
      Specs.StringMaxLengthSpec(this.model, 35, 'streetNumber', 'Número')
    ],
    department: [
      Specs.MandatoryStringSpec(this.model, 'department', 'Departamento'),
      Specs.StringMaxLengthSpec(this.model, 35, 'department', 'Departamento')
    ],
    postalCode: [
      Specs.MandatoryStringSpec(this.model, 'postalCode', 'Código Postal'),
      Specs.StringMaxLengthSpec(this.model, 35, 'postalCode', 'Código Postal')
    ]
  };
}

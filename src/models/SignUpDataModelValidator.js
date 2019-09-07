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
    ],
    creditCardNumber: [
      Specs.MandatoryStringSpec(
        this.model,
        'creditCardNumber',
        'Número de tarjeta de crédito'
      ),
      Specs.StringMinLengthSpec(
        this.model,
        16,
        'creditCardNumber',
        'Número de tarjeta de crédito'
      ),
      Specs.StringMaxLengthSpec(
        this.model,
        19,
        'creditCardNumber',
        'Número de tarjeta de crédito'
      ),
      Specs.IsNumberSpec(
        this.model,
        'creditCardNumber',
        'Número de tarjeta de crédito'
      )
    ],
    creditCardHolder: [
      Specs.MandatoryStringSpec(this.model, 'creditCardHolder', 'Titular'),
      Specs.StringMaxLengthSpec(this.model, 200, 'creditCardHolder', 'Titular')
    ],
    creditCardCcv: [
      Specs.MandatoryStringSpec(this.model, 'creditCardCcv', 'CCV'),
      Specs.StringMaxLengthSpec(this.model, 4, 'creditCardCcv', 'CCV'),
      Specs.StringMinLengthSpec(this.model, 3, 'creditCardCcv', 'CCV')
    ],
    creditCardExpirationDate: [
      Specs.MandatoryStringSpec(
        this.model,
        'creditCardExpirationDate',
        'Fecha de Expiración'
      ),
      Specs.StringMinLengthSpec(
        this.model,
        4,
        'creditCardExpirationDate',
        'Fecha de Expiración'
      ),
      Specs.StringMaxLengthSpec(
        this.model,
        4,
        'creditCardExpirationDate',
        'Fecha de Expiración'
      )
    ],
    billingCompanyName: [
      Specs.MandatoryStringSpec(
        this.model,
        'billingCompanyName',
        'Denominación Fiscal'
      ),
      Specs.StringMaxLengthSpec(
        this.model,
        200,
        'billingCompanyNamme',
        'Denominación Fiscal'
      )
    ],
    billingCompanyIdentification: [
      Specs.MandatoryStringSpec(
        this.model,
        'billingCompanyIdentification',
        'Número de identificación fiscal'
      ),
      Specs.StringMinLengthSpec(
        this.model,
        11,
        'billingCompanyIdentification',
        'Número de identificación fiscal'
      ),
      Specs.StringMaxLengthSpec(
        this.model,
        11,
        'billingCompanyIdentification',
        'Número de identificación fiscal'
      ),
      Specs.IsNumberSpec(
        this.model,
        'billingCompanyIdentification',
        'Número de identificación fiscal'
      )
    ],
    billingProvince: [
      Specs.MandatorySelectionSpec(this.model, 'billingProvince', 'Provincia')
    ],
    billingCity: [
      Specs.MandatoryStringSpec(this.model, 'billingCity', 'Ciudad'),
      Specs.StringMaxLengthSpec(this.model, 200, 'billingCity', 'Ciudad')
    ],
    billingStreet: [
      Specs.MandatoryStringSpec(this.model, 'billingStreet', 'Calle'),
      Specs.StringMaxLengthSpec(this.model, 500, 'billingStreet', 'Calle')
    ],
    billingStreetNumber: [
      Specs.MandatoryStringSpec(this.model, 'billingStreetNumber', 'Número'),
      Specs.StringMaxLengthSpec(this.model, 35, 'billingStreetNumber', 'Número')
    ],
    billingDepartment: [
      Specs.MandatoryStringSpec(
        this.model,
        'billingDepartment',
        'Departamento'
      ),
      Specs.StringMaxLengthSpec(
        this.model,
        35,
        'billingDepartment',
        'Departamento'
      )
    ],
    billingPostalCode: [
      Specs.MandatoryStringSpec(
        this.model,
        'billingPostalCode',
        'Código Postal'
      ),
      Specs.StringMaxLengthSpec(
        this.model,
        35,
        'billingPostalCode',
        'Código Postal'
      )
    ]
  };
}

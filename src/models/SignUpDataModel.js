export class SignUpDataModel {
  pricingPlan = null;
}

export const buildInitialSignUpBody = model => {
  const {
    firstName: FirstName,
    lastName: LastName,
    email: UserName,
    password: Password
  } = model;
  const output = { FirstName, LastName, UserName, Password, Step: 'Initial' };

  return output;
};

export const buildCompanySignUpBody = model => {
  const {
    companyName: Name,
    province: ProvinceId,
    city: City,
    street: StreetName,
    streetNumber: Number,
    department: Department,
    postalCode: PostalCode
  } = model;
  const output = {
    CompanyData: {
      Name,
      ProvinceId,
      City,
      StreetName,
      Number,
      Department,
      PostalCode
    },
    Step: 'Company'
  };

  return output;
};

export const buildCreditCardSignUpBody = model => {
  const {
    creditCardNumber: CreditCardNumber,
    creditCardHolder: CreditCardOwner,
    creditCardCcv: CreditCardCCV,
    creditCardExpirationDate: CreditCardExpirationDateMMYY
  } = model;

  const output = {
    CreditCardNumber,
    CreditCardOwner,
    CreditCardCCV,
    CreditCardExpirationDateMMYY,
    Step: 'Payment'
  };

  return output;
};

export const buildBillingSignUpBody = model => {
  const {
    email: UserName,
    billingCompanyName: BillingCompanyName,
    billingCompanyIdentification: BillingCompanyIdentification,
    billingProvince: BillingProvinceId,
    billingCity: BillingCity,
    billingStreet: BillingStreet,
    billingStreetNumber: BillingStreetNumber,
    billingDepartment: BillingDepartment,
    billingPostalCode: BillingPostalCode
  } = model;

  const output = {
    UserName,
    BillingCompanyName,
    BillingCompanyIdentification,
    BillingProvinceId,
    BillingCity,
    BillingStreet,
    BillingStreetNumber,
    BillingDepartment,
    BillingPostalCode,
    Step: 'Billing'
  };

  return output;
};

export const buildFullSignUpBody = model => {
  const {
    verificationCode: VerificationCode,

    firstName: FirstName,
    lastName: LastName,
    email: UserName,
    password: Password,

    companyName: Name,

    province: AddressProvinceId,
    city: AddressCity,
    street: AddressStreetName,
    streetNumber: AddressStreetNumber,
    department: AddressDepartment,
    postalCode: AddressPostalCode,

    billingCompanyName,
    billingCompanyIdentification,
    billingProvince,
    billingCity,
    billingStreet,
    billingStreetNumber,
    billingDepartment,
    billingPostalCode,

    pricingPlan,

    creditCardNumber,
    creditCardHolder,
    creditCardCcv,
    creditCardExpirationDate
  } = model;

  const output = {
    VerificationCode,

    User: {
      UserName,
      Password,
      FirstName,
      LastName,
      Addresses: [
        {
          Province: { Id: AddressProvinceId },
          StreetName: AddressStreetName,
          StreetNumber: AddressStreetNumber,
          City: AddressCity,
          Department: AddressDepartment,
          PostalCode: AddressPostalCode
        }
      ]
    },
    ClientCompany: {
      Name,
      CurrentPricingPlan: {
        Code: pricingPlan
      },
      Addresses: [
        {
          Province: { Id: AddressProvinceId },
          StreetName: AddressStreetName,
          StreetNumber: AddressStreetNumber,
          City: AddressCity,
          Department: AddressDepartment,
          PostalCode: AddressPostalCode
        }
      ],
      BillingInformation: {
        LegalName: billingCompanyName,
        TaxCode: billingCompanyIdentification,
        Address: {
          Province: { Id: billingProvince },
          StreetName: billingStreet,
          StreetNumber: billingStreetNumber,
          City: billingCity,
          Department: billingDepartment,
          PostalCode: billingPostalCode
        }
      },
      DefaultCreditCard: {
        Number: creditCardNumber,
        Owner: creditCardHolder,
        CCV: creditCardCcv,
        ExpirationDateMMYY: creditCardExpirationDate
      }
    }
  };

  return output;
};

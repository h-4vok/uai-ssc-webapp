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

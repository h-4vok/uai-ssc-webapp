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
  const output = { FirstName, LastName, UserName, Password };

  return output;
};

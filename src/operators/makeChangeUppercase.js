export const makeChangeUppercase = setter => evt => {
  let { value } = evt.target;

  if (value) {
    value = value.toUpperCase();
  }

  setter(value);
};

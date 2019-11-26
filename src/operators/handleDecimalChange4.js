export const handleDecimalChange4 = setter => evt => {
  const { value } = evt.target;

  const regexes = [/^\d+(\.\d{1,4})?$/, /^\d+\.$/];

  const isValid = !value || regexes.some(regx => regx.test(value));

  if (!isValid) return;

  setter(evt.target.value);
};

export const handleDecimalChange = setter => evt => {
  const { value } = evt.target;

  const regexes = [/^\d+(\.\d{1,2})?$/, /^\d+\.$/];

  const isValid = !value || regexes.some(regx => regx.test(value));

  if (!isValid) return;

  setter(evt.target.value);
};

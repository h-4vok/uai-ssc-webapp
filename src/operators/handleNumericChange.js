export const handleNumericChange = setter => evt => {
  const { value } = evt.target;

  const isValid = /^\d+$/.test(value) || !value;

  if (!isValid) return;

  setter(evt.target.value);
};

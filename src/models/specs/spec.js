export const spec = (closure, message) => () => {
  if (closure()) {
    return message;
  }

  return true;
};

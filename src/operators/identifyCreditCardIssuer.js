const amex = n => {
  const firstTwo = parseInt(n.substring(0, 2));
  return firstTwo >= 34 && firstTwo <= 37 ? 'amex' : null;
};
const mastercard = n => {
  const firstTwo = parseInt(n.substring(0, 2));
  const firstFour = parseInt(n.substring(0, 4));

  return (firstTwo >= 51 && firstTwo <= 55) ||
    (firstFour >= 2221 && firstFour <= 2720)
    ? 'mastercard'
    : null;
};
const visa = n => (n.startsWith('4') ? 'visa' : null);

const handlers = [amex, visa, mastercard];

export const identifyCreditCardIssuer = number => {
  for (let i = 0; i < handlers.length; i++) {
    const result = handlers[i](number);
    if (result) return result;
  }

  return 'generic';
};

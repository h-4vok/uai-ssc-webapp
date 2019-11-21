const asTwoDigits = text => {
  if (text.toString().length === 1) return `0${text}`;
  return text;
};

export const dateFormatyyyyMMdd = date =>
  `${date.getFullYear()}${asTwoDigits(date.getMonth())}${asTwoDigits(
    date.getDate()
  )}`;

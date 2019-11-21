const asTwoDigits = text => {
  if (text.length === 1) return `0${text}`;
  return text;
};

export const dateFormatyyyyMMdd = date =>
  `${date.getFullYear()}${asTwoDigits(date.getMonth())}${asTwoDigits(
    date.getDate()
  )}`;

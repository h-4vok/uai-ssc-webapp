export const manualTimezoneFix = dateString => {
  const date = new Date(dateString);
  date.setHours(date.getHours() - 3);

  return date;
};

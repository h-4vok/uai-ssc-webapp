import { spec } from './spec';

export const StringMinLengthSpec = (model, minLength, propName, propLabel) =>
  spec(
    () => model[propName].length < minLength,
    `El campo ${propLabel} debe superar los ${minLength} caracteres.`
  );

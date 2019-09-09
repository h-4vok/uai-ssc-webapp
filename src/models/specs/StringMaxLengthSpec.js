import { spec } from './spec';

export const StringMaxLengthSpec = (model, maxLength, propName, propLabel) =>
  spec(
    () => model[propName] && model[propName].length > maxLength,
    `El campo ${propLabel} no puede superar los ${maxLength} caracteres.`
  );

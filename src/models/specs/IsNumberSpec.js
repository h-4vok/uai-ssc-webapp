import { spec } from './spec';
/* eslint-disable no-useless-escape */
const regex = /^\d+$/;

export const IsNumberSpec = (model, propName, propLabel) =>
  spec(
    () => !regex.test(model[propName]),
    `El campo ${propLabel} debe ser numérico.`
  );

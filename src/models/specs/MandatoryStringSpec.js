import { spec } from './spec';

export const MandatoryStringSpec = (model, propName, propLabel) =>
  spec(
    () => !model[propName] || !model[propName].trim(),
    `El campo ${propLabel} no puede ser vacio.`
  );

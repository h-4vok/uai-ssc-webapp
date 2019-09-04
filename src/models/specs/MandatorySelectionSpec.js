import { spec } from './spec';

export const MandatorySelectionSpec = (model, propName, propLabel) =>
  spec(
    () => !model[propName] || model[propName] === 0,
    `El campo ${propLabel} es obligatorio.`
  );

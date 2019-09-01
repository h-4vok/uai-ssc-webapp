import { spec } from './spec';

export const SameStringSpec = (model, propName1, propName2, message) =>
  spec(() => model[propName1] !== model[propName2], message);

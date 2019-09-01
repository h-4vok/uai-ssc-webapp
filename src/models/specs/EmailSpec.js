import { spec } from './spec';
/* eslint-disable no-useless-escape */
const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const EmailSpec = (model, propName, propLabel) =>
  spec(
    () => !regex.test(model[propName]),
    `El campo ${propLabel} no cumple con las reglas indicadas.`
  );

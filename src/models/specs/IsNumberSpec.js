import fillTemplate from 'es6-dynamic-template';
import { spec } from './spec';
import { fromI10n } from '../../lib/GlobalState';

/* eslint-disable no-useless-escape */
const regex = /^\d+$/;

export const IsNumberSpec = (model, propName, propLabel) =>
  spec(
    () => !regex.test(model[propName]),
    fillTemplate(fromI10n('validator.ui.is-number-spec'), { propLabel })
  );

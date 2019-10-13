import fillTemplate from 'es6-dynamic-template';
import { spec } from './spec';
import { fromI10n } from '../../lib/GlobalState';

/* eslint-disable no-useless-escape */
const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const EmailSpec = (model, propName, propLabel) =>
  spec(
    () => !regex.test(model[propName]),
    fillTemplate(fromI10n('validator.ui.email-spec'), { propLabel })
  );

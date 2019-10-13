import fillTemplate from 'es6-dynamic-template';
import { spec } from './spec';
import { fromI10n } from '../../lib/GlobalState';

export const StringMinLengthSpec = (model, minLength, propName, propLabel) =>
  spec(
    () => model[propName] && model[propName].length < minLength,
    fillTemplate(fromI10n('validator.ui.string-min-length-spec'), {
      propLabel,
      minLength
    })
  );

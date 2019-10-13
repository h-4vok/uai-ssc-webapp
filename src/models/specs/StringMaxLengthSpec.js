import fillTemplate from 'es6-dynamic-template';
import { spec } from './spec';
import { fromI10n } from '../../lib/GlobalState';

export const StringMaxLengthSpec = (model, maxLength, propName, propLabel) =>
  spec(
    () => model[propName] && model[propName].length > maxLength,
    fillTemplate(fromI10n('validator.ui.string-max-length-spec'), {
      propLabel,
      maxLength
    })
  );

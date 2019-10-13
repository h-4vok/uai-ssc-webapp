import fillTemplate from 'es6-dynamic-template';
import { spec } from './spec';
import { fromI10n } from '../../lib/GlobalState';

export const MandatoryStringSpec = (model, propName, propLabel) =>
  spec(
    () => !model[propName] || !model[propName].trim(),
    fillTemplate(fromI10n('validator.ui.mandatory-string-spec'), {
      propLabel
    })
  );

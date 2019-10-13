import fillTemplate from 'es6-dynamic-template';
import { spec } from './spec';
import { fromI10n } from '../../lib/GlobalState';

export const MandatorySelectionSpec = (model, propName, propLabel) =>
  spec(
    () => !model[propName] || model[propName] === 0,
    fillTemplate(fromI10n('validator.ui.mandatory-selection-spec'), {
      propLabel
    })
  );

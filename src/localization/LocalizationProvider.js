import React from 'react';
import LocalizationContext from './LocalizationContext';

function LocalizationProvider(props) {
  const { children, i10n } = props;

  return (
    <LocalizationContext.Provider value={i10n}>
      {children}
    </LocalizationContext.Provider>
  );
}

export default LocalizationProvider;

import React from 'react';
import LocalizationContext from './LocalizationContext';

export default function useLocalization() {
  return React.useContext(LocalizationContext);
}

import React from 'react';
import MaskedInput from 'react-text-mask';

export function MaskedTextInput(props) {
  const { inputRef, mask, showMask, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      style={{ width: '100%' }}
      mask={mask}
      placeholderChar={'\u2000'}
      showMask={showMask}
    />
  );
}

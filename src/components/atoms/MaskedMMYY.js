import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MaskedInput from 'react-text-mask';

const digit = /\d/;
const mmyyMask = [digit, digit, '/', digit, digit];

function MaskedTextInput(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      style={{ width: '100%' }}
      mask={mmyyMask}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

export function MaskedMMYY(props) {
  const { value, label, id, onChange, fullWidth } = props;

  return (
    <FormControl>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Input
        fullWidth={fullWidth}
        value={value}
        onChange={onChange}
        id={id}
        input={MaskedTextInput}
      />
    </FormControl>
  );
}

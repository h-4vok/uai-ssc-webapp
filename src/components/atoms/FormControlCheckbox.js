import React from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';

export const FormControlCheckbox = props => (
  <FormControlLabel
    control={
      <Checkbox
        checked={props.checked}
        value={props.value}
        onChange={props.onChange}
      />
    }
    label={props.label}
  />
);

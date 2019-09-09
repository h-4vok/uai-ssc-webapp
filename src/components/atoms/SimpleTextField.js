import React, { PureComponent } from 'react';
import TextField from '@material-ui/core/TextField';

export class SimpleTextField extends PureComponent {
  render() {
    const { maxLength, inputProps = {} } = this.props;

    inputProps.maxLength = inputProps.maxLength || maxLength;

    return <TextField {...this.props} inputProps={inputProps} />;
  }
}

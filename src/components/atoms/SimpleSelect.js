import React, { PureComponent } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
});

class SimpleSelectComponent extends PureComponent {
  constructor(props) {
    super(props);

    const { classes, name, value, label, items, noEmpty } = this.props;

    this.classes = classes;

    this.state = {
      name,
      label,
      value,
      items,
      noEmpty
    };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
    if (this.props.onChange) this.props.onChange(event);
  };

  render() {
    return (
      <FormControl className={this.classes.formControl}>
        <InputLabel htmlFor={this.state.name}>{this.state.label}</InputLabel>
        <Select
          value={this.state.value}
          onChange={this.handleChange}
          inputProps={{
            name: this.state.name,
            id: this.state.name
          }}
        >
          {!this.state.noEmpty && (
            <MenuItem value="">
              <em>Sin selección</em>
            </MenuItem>
          )}

          {this.state.items.map(item => (
            <MenuItem value={item.value}>{item.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
}

export const SimpleSelect = withStyles(styles)(SimpleSelectComponent);

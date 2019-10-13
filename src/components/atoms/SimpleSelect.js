import React, { PureComponent } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  formControl: {
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
});

class SimpleSelectComponent extends PureComponent {
  constructor(props) {
    super(props);

    const {
      classes,
      name,
      value,
      items = [],
      noEmpty,
      showLabel = true
    } = this.props;

    this.classes = classes;

    this.state = {
      name,
      value,
      items,
      noEmpty,
      showLabel
    };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
    if (this.props.onChange) this.props.onChange(event);
  };

  render() {
    return (
      <FormControl {...this.props} className={this.classes.formControl}>
        {this.state.showLabel && (
          <InputLabel htmlFor={this.state.name}>{this.props.label}</InputLabel>
        )}
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

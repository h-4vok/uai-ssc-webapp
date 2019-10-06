import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const styles = () => ({
  buttonBar: {
    display: 'flex',
    alignItems: 'center'
  }
});

class ButtonBarComponent extends PureComponent {
  buildItems() {
    const output = this.props.children.map(child => <Box p={1}>{child}</Box>);

    return output;
  }

  render() {
    const { classes } = this.props;

    return <div className={classes.buttonBar}>{this.buildItems()}</div>;
  }
}

export const ButtonBar = withStyles(styles)(ButtonBarComponent);

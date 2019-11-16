import React, { PureComponent } from 'react';
import { Container, Box, Typography, Button } from '@material-ui/core';
import withLocalization from '../../localization/withLocalization';

class DoRestoreFromTemplateComponent extends PureComponent {
  onChange = evt => {
    const File = evt.target.files[0];
    this.props.model.File = File;
  };

  render() {
    const { onConfirm, i10n } = this.props;

    return (
      <Container maxWidth="xs" spacing={5}>
        <Box m={2}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={onConfirm}
          >
            {i10n['global.confirm']}
          </Button>
        </Box>
        <Box m={2}>
          <Typography>
            {i10n['restore.from.tip']}
          </Typography>
        </Box>
        <Box m={2}>
          <input
            type="file"
            name="File"
            onChange={this.onChange}
            accept=".bkp"
          />
        </Box>
      </Container>
    );
  }
}

export const DoRestoreFromTemplate = withLocalization(
  DoRestoreFromTemplateComponent
);

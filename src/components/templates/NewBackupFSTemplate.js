import React, { PureComponent } from 'react';
import { Container, Button, Box, Typography } from '@material-ui/core';
import withLocalization from '../../localization/withLocalization';

class NewBackupFSTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      FilePath: ''
    };
  }

  updateFilePath = path => {
    this.props.model.FilePath = path;
    this.setState({ FilePath: path });
  };

  showBrowseFolder = () => {
    const browseFolder = document.getElementById('browseFolder');
    browseFolder.click();
    if (browseFolder.value.length) {
      const path = browseFolder.value.substring(
        0,
        browseFolder.value.lastIndexOf('\\')
      );

      this.updateFilePath(path);
    }
  };

  render() {
    const { i10n, onConfirm } = this.props;
    const { FilePath } = this.state;

    return (
      <Container maxWidth="sm">
        <input type="file" id="browseFolder" style={{ display: 'none' }} />
        <Button
          color="primry"
          variant="contained"
          mt={3}
          onClick={this.showBrowseFolder}
        >
          {i10n['new-backup-fs.browse-folder']}
        </Button>
        <Box mt={3}>
          <Typography>{FilePath}</Typography>
        </Box>
        <Box mt={3}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={onConfirm}
          >
            {i10n['global.confirm']}
          </Button>
        </Box>
      </Container>
    );
  }
}

export const NewBackupFSTemplate = withLocalization(
  NewBackupFSTemplateComponent
);

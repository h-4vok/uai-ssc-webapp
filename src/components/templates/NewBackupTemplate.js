import React, { PureComponent } from 'react';
import { Container, Button, Box } from '@material-ui/core';
import { SimpleTextField } from '../atoms';
import withLocalization from '../../localization/withLocalization';

class NewBackupTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    const { FilePath } = this.props.model;

    this.state = { FilePath };
  }

  onInputChange = evt => {
    this.props.model[evt.target.name] = evt.target.value;
    this.setState({ [evt.target.name]: evt.target.value });
  };

  render() {
    const { i10n, onConfirm } = this.props;
    const { FilePath } = this.state;

    return (
      <Container maxWidth="sm">
        <SimpleTextField
          required
          id="FilePath"
          name="FilePath"
          label={i10n['backup.filepath']}
          fullWidth
          value={FilePath}
          onChange={this.onInputChange}
        />
        <Box mt={1}>
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

export const NewBackupTemplate = withLocalization(NewBackupTemplateComponent);

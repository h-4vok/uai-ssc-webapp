import React, { PureComponent } from 'react';
import { Container, Grid, Typography, Button } from '@material-ui/core';
import { SimpleTextField } from '../atoms';
import withLocalization from '../../localization/withLocalization';

class RejectReturnRequestTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    const { RejectionMotive } = this.props;

    this.state = { RejectionMotive };
  }

  onInputChange = evt => {
    this.props.model[evt.target.name] = evt.target.value;
    this.setState({ [evt.target.name]: evt.target.value });
  };

  render() {
    const { onConfirm, i10n } = this.props;
    const { RejectionMotive } = this.state;

    return (
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h3">
              {i10n['reject-return-request.page.title']}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {i10n['reject-return-request.page.help']}
          </Grid>
          <Grid item xs={12}>
            <SimpleTextField
              value={RejectionMotive}
              label={i10n['reject-return-request.rejection-text']}
              name="RejectionMotive"
              multiline
              fullWidth
              rows="3"
              rowsMax="6"
              onChange={this.onInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button color="secondary" variant="contained" onClick={onConfirm}>
              {i10n['global.confirm']}
            </Button>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export const RejectReturnRequestTemplate = withLocalization(
  RejectReturnRequestTemplateComponent
);

import React, { PureComponent } from 'react';
import { Container, Grid, Typography, Button } from '@material-ui/core';
import withLocalization from '../../localization/withLocalization';
import { SimpleTextField } from '../atoms';

class SubscribeToNewsletterTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { Email: '' };
  }

  onInputChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  render() {
    const { i10n, onConfirm } = this.props;
    const { Email } = this.state;

    return (
      <Container main maxWidth="xs">
        <Grid item xs={12}>
          <Typography variant="h4">
            {i10n['subscribe-newsletter.title']}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>{i10n['subscribe-newsletter.subttitle']}</Typography>
        </Grid>
        <Grid item xs={12}>
          <SimpleTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Email"
            label={i10n['subscribe-newsletter.email']}
            name="Email"
            autoComplete="email"
            autoFocus
            value={Email}
            onChange={this.onInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => onConfirm(Email)}
          >
            {i10n['global.confirm']}
          </Button>
        </Grid>
      </Container>
    );
  }
}

export const SubscribeToNewsletterTemplate = withLocalization(
  SubscribeToNewsletterTemplateComponent
);

import React, { PureComponent } from 'react';
import { Container, Grid, Typography, Button } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import withLocalization from '../../localization/withLocalization';

class SendNewsletterTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    const { DateFrom, DateTo } = this.props.model;

    this.state = { DateFrom, DateTo };
  }

  onDateChange = name => date => {
    this.props.model[name] = date;
    this.setState({ [name]: date });
  };

  render() {
    const { i10n, onConfirm } = this.props;
    const { DateFrom, DateTo } = this.state;

    return (
      <Container main maxWidth="xs">
        <Grid item xs={12}>
          <Typography variant="h4">
            {i10n['send-newsletter.page.title']}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>{i10n['send-newsletter.page.subtitle']}</Typography>
        </Grid>
        <Grid item xs={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              label={i10n['send-newsletter.date-from']}
              format="dd/MM/yyyy"
              value={DateFrom}
              onChange={this.onDateChange('DateFrom')}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              label={i10n['send-newsletter.date-to']}
              format="dd/MM/yyyy"
              value={DateTo}
              onChange={this.onDateChange('DateTo')}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>

        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={onConfirm}
          >
            {i10n['global.confirm']}
          </Button>
        </Grid>
      </Container>
    );
  }
}

export const SendNewsletterTemplate = withLocalization(
  SendNewsletterTemplateComponent
);

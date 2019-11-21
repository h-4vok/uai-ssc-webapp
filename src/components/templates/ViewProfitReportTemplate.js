import React, { PureComponent } from 'react';
import { Container, Button, Grid, Typography } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import withLocalization from '../../localization/withLocalization';
import { ProfitReportChart } from '../organisms';

class ViewProfitReportTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    this.state = {
      dateFrom: oneYearAgo,
      dateTo: today
    };
  }

  onDateChange = fieldName => date => {
    this.setState({ [fieldName]: date });
  };

  mapToChartData = data =>
    data.map(item => ({
      x: new Date(item.Year, item.Month, item.Day),
      y: item.Profit
    }));

  render() {
    const { data, i10n, onRefresh } = this.props;
    const { dateFrom, dateTo } = this.state;

    let dataPoints = null;
    console.log({ data });
    if (data) {
      dataPoints = this.mapToChartData(data);
    }

    return (
      <Container maxWidth="md">
        <Container maxWidth="sm">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5">
                {i10n['view-profit-report.page.title']}
              </Typography>
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'center' }}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  label={i10n['view-profit-report.filter.date-from']}
                  format="dd/MM/yyyy"
                  value={dateFrom}
                  onChange={this.onDateChange('dateFrom')}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'center' }}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  label={i10n['view-profit-report.filter.date-to']}
                  format="dd/MM/yyyy"
                  value={dateTo}
                  onChange={this.onDateChange('dateTo')}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12}>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                onClick={() => onRefresh(dateFrom, dateTo)}
              >
                {i10n['global.action.refresh']}
              </Button>
            </Grid>
          </Grid>
        </Container>
        {data && (
          <ProfitReportChart
            containerId="view-profit-chart-div"
            dataPoints={dataPoints}
          />
        )}
      </Container>
    );
  }
}

export const ViewProfitReportTemplate = withLocalization(
  ViewProfitReportTemplateComponent
);

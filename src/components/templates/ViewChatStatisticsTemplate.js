import React, { PureComponent } from 'react';
import { Container, Button, Typography } from '@material-ui/core';
import withLocalization from '../../localization/withLocalization';
import { ChatStatisticsGrid, ChatStatisticsChart } from '../organisms';

class ViewChatStatisticsTemplateComponent extends PureComponent {
  mapForChart = data => {
    return data.map(item => ({
      x: new Date(item.Year, item.Month, item.Day),
      y: item.AverageEffectivity
    }));
  };

  render() {
    const { data, onRefresh, i10n } = this.props;
    const { SpecificStatistics: detailed, ByDay: chartData } = data;
    const dataPoints = this.mapForChart(chartData);

    return (
      <Container maxWidth="lg" spacing={3}>
        <Typography variant="h4">
          {i10n['view-chat-stats.page.title']}
        </Typography>
        <Button
          color="primary"
          variant="contained"
          onClick={onRefresh}
          fullWidth
        >
          {i10n['global.action.refresh']}
        </Button>

        <ChatStatisticsGrid items={detailed} />
        <Container maxWidth="md">
          <ChatStatisticsChart
            containerId="chat-stats-div"
            dataPoints={dataPoints}
          />
        </Container>
      </Container>
    );
  }
}

export const ViewChatStatisticsTemplate = withLocalization(
  ViewChatStatisticsTemplateComponent
);

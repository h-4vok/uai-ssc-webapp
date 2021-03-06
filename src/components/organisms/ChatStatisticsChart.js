import React, { PureComponent } from 'react';
import withLocalization from '../../localization/withLocalization';

class ChatStatisticsChartComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.CanvasJS = window.CanvasJS;

    const { dataPoints, i10n } = this.props;

    this.options = {
      exportEnabled: true,
      animationEnabled: true,
      title: {
        text: i10n['chat-statistics-chart.title']
      },
      axisY: {
        title: i10n['chat-statistics-chart.axis-y'],
        suffix: ' %',
        minimum: 0,
        maximum: 100
      },
      data: [
        {
          type: 'splineArea',
          color: 'rgba(54,158,173,.7)',
          markerSize: 5,
          dataPoints
        }
      ]
    };
  }

  componentDidMount() {
    const chart = new this.CanvasJS.Chart(this.props.containerId, this.options);

    chart.render();
  }

  render() {
    return <div id={this.props.containerId} />;
  }
}

export const ChatStatisticsChart = withLocalization(
  ChatStatisticsChartComponent
);

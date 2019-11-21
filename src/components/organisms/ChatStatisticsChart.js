import React, { PureComponent } from 'react';
import withLocalization from '../../localization/withLocalization';

class ChatStatisticsChartComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.CanvasJS = window.CanvasJS;

    const { dataPoints, i10n } = this.props;

    console.log({ dataPoints });
    const otherDatapoints = [
      { x: new Date(2000, 1, 1), y: 66 },
      { x: new Date(2000, 1, 2), y: 12 },
      { x: new Date(2000, 1, 3), y: 77 },
      { x: new Date(2000, 1, 4), y: 75 },
      { x: new Date(2000, 1, 5), y: 43 }
    ];
    console.log({ otherDatapoints });

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

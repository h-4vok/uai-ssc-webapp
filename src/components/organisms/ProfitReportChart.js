import React, { PureComponent } from 'react';
import withLocalization from '../../localization/withLocalization';

class ProfitReportChartComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.CanvasJS = window.CanvasJS;

    const { dataPoints, i10n } = this.props;

    this.options = {
      zoomEnabled: true,
      exportEnabled: true,
      animationEnabled: true,
      title: {
        text: i10n['profit-report-chart.title']
      },
      axisY: {
        title: i10n['profit-report-chart.axis-y'],
        prefix: '$ '
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
    this.updateChart();
  }

  componentDidUpdate() {
    this.updateChart();
  }

  updateChart = () => {
    const chart = new this.CanvasJS.Chart(this.props.containerId, this.options);

    chart.render();
  };

  render() {
    const { dataPoints } = this.props;
    this.options.data[0].dataPoints = dataPoints;

    return <div id={this.props.containerId} />;
  }
}

export const ProfitReportChart = withLocalization(ProfitReportChartComponent);

import React, { PureComponent } from 'react';

export class SurveyResults extends PureComponent {
  constructor(props) {
    super(props);

    this.CanvasJS = window.CanvasJS;

    this.options = {
      exportEnabled: true,
      animationEnabled: true,
      title: {
        text: props.title
      },
      data: [
        {
          type: 'pie',
          startAngle: 75,
          toolTipContent: '<b>{label}</b>: {y}%',
          showInLegend: 'true',
          legendText: '{label}',
          indexLabelFontSize: 16,
          indexLabel: '{label} - {y}%',
          dataPoints: props.data
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
